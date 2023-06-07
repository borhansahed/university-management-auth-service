import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import logger from './shared/logger'
;(async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.infoLogger.info(' Database Connected')
  } catch (err) {
    logger.errorLogger.error('not working', err)
  }
})()

app.listen(config.port, () => {
  logger.infoLogger.info(`app listening on port ${config.port}`)
})
