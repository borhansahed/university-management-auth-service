import express from 'express'

import zodValidation from '../../middleware/zodValidation'

import { StudentController } from './student.controller'

import { StudentValidation } from './student.validation'

const route = express.Router()

route.get('/', StudentController.getStudents)
route.get('/:id', StudentController.getStudent)
route.delete('/:id', StudentController.deleteStudent)
route.patch(
  '/:id',
  zodValidation(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
)

export const StudentRoute = route
