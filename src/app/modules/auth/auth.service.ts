import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import { ILoginUser } from './auth.interface'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwtHelper } from '../../../helper/jwtHelper'

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload

  const isUser = await User.isUserExit(id)

  if (!isUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't Exits")
  }

  if (
    isUser.password &&
    !(await User.isPasswordMatch(password, isUser.password))
  ) {
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

const refreshToken = async (
  token: string
): Promise<{ newAccessToken: string }> => {
  let verifiedToken = null

  try {
    verifiedToken = jwtHelper.jwtVerify(
      token,
      config.jwt.jwt_refresh_secret as Secret
    )
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refreshToken')
  }

  const { id } = verifiedToken
  const isUserExit = await User.isUserExit(id)
  if (!isUserExit) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't found")
  }

  const newAccessToken = jwtHelper.createToken(
    {
      id: isUserExit.id,
      role: isUserExit.role,
    },
    config.jwt.jwt_access_secret as Secret,
    { expiresIn: config.jwt.jwt_access_token_expires_in }
  )

  return {
    newAccessToken,
  }
}

export const AuthService = {
  loginUser,
  refreshToken,
}
