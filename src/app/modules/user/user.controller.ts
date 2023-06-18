import { RequestHandler } from 'express'
import userService from './user.service'
import catchAsync from '../../../shared/catchAsync'

const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { user } = req.body
  const data = await userService.createUser(user)
  res.status(200).json({
    success: true,
    message: 'successfully created',
    data: data,
  })
  next()
})

export const UserController = {
  createUser,
}
