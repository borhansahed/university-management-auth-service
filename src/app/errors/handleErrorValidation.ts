import mongoose from 'mongoose'
import { IGenericCommonError, IGenericErrorMessage } from '../interfaces/error'

const handleErrorValidation = (
  err: mongoose.Error.ValidationError
): IGenericCommonError => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (e: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: e?.path,
        message: e?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleErrorValidation
