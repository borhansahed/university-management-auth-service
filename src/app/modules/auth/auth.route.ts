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

export const AuthRoute = route
