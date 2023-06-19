import mongoose from 'mongoose'
import config from '../../../config/index'
import AcademicSemester from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import { StudentModel } from '../student/student.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  let newUserData = null
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  // set role
  user.role = 'student'
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generateStudentId(academicSemester)
    user.id = id
    student.id = id

    const newStudent = await StudentModel.create([student], { session })

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    user.student = newStudent[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) throw new Error('failed to create user!')

    newUserData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
  }

  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    })
  }
  return newUserData
}

export default {
  createStudent,
}
