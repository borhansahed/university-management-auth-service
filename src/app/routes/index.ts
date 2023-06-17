import express from 'express'
import userRoute from '../modules/user/user.route'
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route'

const routes = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRoute,
  },

  {
    path: '/academic-semesters',
    route: academicSemesterRoute,
  },
]

moduleRoutes.forEach(route => routes.use(route.path, route.route))

export default routes
