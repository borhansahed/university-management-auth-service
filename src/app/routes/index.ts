import express from 'express'
import userRoute from '../modules/user/user.route'
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route'

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
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoute,
  },
]

moduleRoutes.forEach(route => routes.use(route.path, route.route))

export default routes
