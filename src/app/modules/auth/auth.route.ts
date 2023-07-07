import express from 'express'
import Validation from '../../middleware/Validation'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'

const route = express.Router()

route.post(
  '/login',
  Validation(AuthValidation.loginValidation),
  AuthController.loginUser
)

route.post(
  '/refresh-token',
  Validation(AuthValidation.refreshTokenValidation),
  AuthController.refreshToken
)

export const AuthRoute = route
