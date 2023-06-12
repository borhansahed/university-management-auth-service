import { RequestHandler } from 'express'
import userService from './user.service'

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const data = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'successfully created',
      data: data,
    })
  } catch (err) {
    next(err)
  }
}
