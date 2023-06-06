import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

/* eslint-disable no-console */
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database Connected')
  } catch (err) {
    console.log(err)
  }
}

app.listen(config.port, () => {
  console.log(`app listening on port ${config.port}`)
  main()
})
