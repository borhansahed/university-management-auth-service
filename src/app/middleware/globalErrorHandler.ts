/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import {
  IGenericCommonError,
  IGenericErrorMessage,
} from '../../interfaces/error'
import handleErrorValidation from '../../errors/handleErrorValidation'

import ApiError from '../../errors/ApiError'
import logger from '../../shared/logger'
import { ZodError } from 'zod'
import handleZodError from '../../errors/handleZodError'
import handleCastError from '../../errors/handleCastError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'Something wrong here'
  let errorMessages: IGenericErrorMessage[] = []

  config.env === 'development'
    ? console.log('Error', err)
    : logger.errorLogger.error('err', err)

  if (err?.name === 'ValidationError') {
    const simplifiedError: IGenericCommonError = handleErrorValidation(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
}

export default globalErrorHandler
