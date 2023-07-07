import { RequestHandler } from 'express'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import { AuthService } from './auth.service'

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...userData } = req.body
  const result = await AuthService.loginUser(userData)

  res.status(httpStatus.OK).json({
    success: true,
    message: 'User successfully logIn',
    data: result,
  })
})

export const AuthController = {
  loginUser,
}
