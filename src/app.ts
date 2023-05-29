import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

app.use(cors())

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: any) => {
  res.send('Hello World!')
})

export default app
