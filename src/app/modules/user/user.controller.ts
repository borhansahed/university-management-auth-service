import { Request, Response } from 'express'
import userService from './user.service'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const data = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'successfully created',
      data: data,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'failed to user create',
    })
  }
}
