import express from 'express'
import Validation from '../../middleware/Validation'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'

const route = express.Router()

route.get('/', AcademicSemesterController.getAllSemester)
route.post(
  '/create-semester',
  Validation(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
)
route.get('/:id', AcademicSemesterController.getSingleSemester)
route.patch(
  '/:id',
  Validation(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
)

route.delete('/:id', AcademicSemesterController.deleteSemester)

export const academicSemesterRoute = route
