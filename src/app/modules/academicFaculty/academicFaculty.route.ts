import express from 'express'
import { AcademicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import Validation from '../../middleware/Validation'

const router = express.Router()

router.post(
  '/create-faculty',
  Validation(AcademicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty
)

router.get('/:id', AcademicFacultyController.getSingleFaculty)

router.patch(
  '/:id',
  Validation(AcademicFacultyValidation.updatefacultyZodSchema),
  AcademicFacultyController.updateFaculty
)

router.delete('/:id', AcademicFacultyController.deleteFaculty)

router.get('/', AcademicFacultyController.getAllFaculties)

export const AcademicFacultyRoute = router
