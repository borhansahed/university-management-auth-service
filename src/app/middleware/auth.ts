import { NextFunction, Request, Response } from 'express'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { jwtHelper } from '../../helper/jwtHelper'
import config from '../../config'
import { Secret } from 'jsonwebtoken'

const auth =
  (...userRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not authorized')
      }

      const verifiedUser = jwtHelper.jwtVerify(
        token,
        config.jwt.jwt_access_secret as Secret
      )

      req.user = verifiedUser

      if (userRole.length && !userRole.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'forbidden')
      }
      next()
    } catch (err) {
      next(err)
    }
  }

export default auth
