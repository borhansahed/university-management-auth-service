import express from 'express'
import { createUser } from './user.controller'

const userRoute = express.Router()

userRoute.post('/create-user', createUser)

export default userRoute
