import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import { ILoginUser } from './auth.interface'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwtHelper } from '../../../helper/jwtHelper'

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload
  const user = new User()

  const isUser = await user.isUserExit(id)

  if (!isUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't Exits")
  }

  const isPasswordMatch =
    isUser.password && (await user.isPasswordMatch(password, isUser.password))
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  // create access token and refresh token
  const { needPasswordChange } = isUser
  const accessToken = jwtHelper.createToken(
    {
      id: isUser.id,
      role: isUser.role,
    },
    config.jwt.jwt_access_secret as Secret,
    { expiresIn: config.jwt.jwt_access_token_expires_in }
  )
  const refreshToken = jwtHelper.createToken(
    {
      id: isUser.id,
      role: isUser.role,
    },
    config.jwt.jwt_refresh_secret as Secret,
    { expiresIn: config.jwt.jwt_refresh_token_expires_in }
  )

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  }
}

export const AuthService = {
  loginUser,
}
