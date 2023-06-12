/* eslint-disable no-console */
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import logger from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', err => {
  console.log('yes man ')
  logger.errorLogger.error('uncaughtException', err)
  process.exit(1)
})
let server: Server
;(async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.infoLogger.info(' Database Connected')
  } catch (err) {
    logger.errorLogger.error('not working', err)
  }

  server = app.listen(config.port, () => {
    logger.infoLogger.info(`app listening on port ${config.port}`)
  })
})()

process.on('unhandledRejection', error => {
  console.log('unhandled Error server....')
  logger.errorLogger.error('error', error)
  if (server) {
    server.close(() => {
      logger.errorLogger.error('error', error)
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
})

process.on('SIGTERM', () => {
  logger.infoLogger.info('SIGTERM Received')

  if (server) {
    server.close()
  }
})
