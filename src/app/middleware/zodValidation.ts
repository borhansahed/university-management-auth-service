import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'

const zodValidation =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      })
      next()
    } catch (error) {
      next(error)
    }
  }

export default zodValidation
