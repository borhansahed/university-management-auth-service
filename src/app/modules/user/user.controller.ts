import { RequestHandler } from 'express'
import userService from './user.service'
import catchAsync from '../../../shared/catchAsync'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { student, ...user } = req.body
  const data = await userService.createStudent(student, user)
  res.status(200).json({
    success: true,
    message: 'successfully created',
    data: data,
  })
})

export const UserController = {
  createStudent,
}
