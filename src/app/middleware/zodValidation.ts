import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'

const zodValidation =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req)
      next()
    } catch (error) {
      next(error)
    }
  }

export default zodValidation
