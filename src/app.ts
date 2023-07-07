import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import routes from './app/routes'
import cookieParser from 'cookie-parser'

const app: Application = express()

app.use(cors())

// body parser
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// Application routes

app.use('/api/v1', routes)

app.get('/', async (req: Request, res: Response) => {
  res.send('Welcome to University Management')
})

app.use(globalErrorHandler)
app.use((req, res, next) => {
  res.status(400).send({
    success: false,
    message: 'Not found',
    errorMessages: [{ path: req.originalUrl, message: 'Route not found' }],
  })

  next()
})

export default app
