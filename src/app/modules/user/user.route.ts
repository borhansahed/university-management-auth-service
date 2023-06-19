import express from 'express'
import { UserController } from './user.controller'
import createUserZodSchema from './user.validation'
import Validation from '../../middleware/zodValidation'

const userRoute = express.Router()

userRoute.post(
  '/create-student',
  Validation(createUserZodSchema),
  UserController.createStudent
)

export default userRoute
