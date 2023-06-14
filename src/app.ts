import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRoute from './app/modules/user/user.route'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { academicSemesterRoute } from './app/modules/academicSemester/academicSemester.route'

const app: Application = express()

app.use(cors())

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes

app.use('/api/v1/users/', userRoute)
app.use('/api/v1/academic-semesters/', academicSemesterRoute)

app.get('/', async (req: Request, res: Response) => {
  res.send('Welcome to University Management')
})

app.use(globalErrorHandler)

export default app
