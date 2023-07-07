import { RequestHandler } from 'express'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import { AuthService } from './auth.service'
import config from '../../../config'

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...userData } = req.body
  const result = await AuthService.loginUser(userData)
  const { refreshToken, ...others } = result

  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOption)

  res.status(httpStatus.OK).json({
    success: true,
    message: 'User successfully logIn',
    data: others,
  })
})
const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies

  const result = await AuthService.refreshToken(refreshToken)

  res.status(httpStatus.OK).json({
    success: true,
    message: 'New accessToken successfully created',
    data: result,
  })
})

export const AuthController = {
  loginUser,
  refreshToken,
}
