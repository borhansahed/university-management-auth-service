import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorMessage } from '../interfaces/error'

const handleZodError = (err: ZodError) => {
  const errors: IGenericErrorMessage[] = err.issues.map((e: ZodIssue) => {
    return {
      path: e.path[e.path.length - 1],
      message: e.message,
    }
  })

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleZodError
