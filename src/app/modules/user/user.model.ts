/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'

export const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },

    needPasswordChange: {
      type: Boolean,
      default: true,
    },

    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    // faculty: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Faculty',
    // },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Admin',
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

userSchema.static(
  'isUserExit',
  async function (id: string): Promise<Partial<IUser> | null> {
    return await User.findOne(
      { id },
      { id: 1, password: 1, role: 1, needPasswordChange: 1 }
    ).lean()
  }
)

userSchema.static(
  'isPasswordMatch',
  async function (
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean> {
    const match = await bcrypt.compare(givenPassword, savedPassword)
    return match
  }
)

userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

export const User = model<IUser, UserModel>('User', userSchema)
