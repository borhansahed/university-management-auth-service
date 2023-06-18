import express from 'express'
import { UserController } from './user.controller'
import zodValidation from '../../middleware/zodValidation'
import createUserZodSchema from './user.validation'

const userRoute = express.Router()

userRoute.post(
  '/create-user',
  zodValidation(createUserZodSchema),
  UserController.createUser
)

export default userRoute
