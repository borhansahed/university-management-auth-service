import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'

export type IUser = {
  id: string
  role: string
  password: string
  needPasswordChange: true | false
  student?: Types.ObjectId | IStudent
  // faculty?: Types.ObjectId
  // admin?: Types.ObjectId
}
export type IUserMethods = {
  isUserExit(id: string): Promise<Partial<IUser> | null>
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>
