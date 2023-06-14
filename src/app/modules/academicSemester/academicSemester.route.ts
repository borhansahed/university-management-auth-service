import express from 'express'
import zodValidation from '../../middleware/zodValidation'
import createAcademicSemesterZodSchema from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'

const route = express.Router()

route.post(
  '/create-semester',
  zodValidation(createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
)

export const academicSemesterRoute = route
