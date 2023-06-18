import express from 'express'
import { AcademicDepartmentController } from './academicDepartment.controller'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
import Validation from '../../middleware/zodValidation'

const router = express.Router()

router.post(
  '/create-department',
  Validation(AcademicDepartmentValidation.createAcademicDepartmentZodSchema),
  AcademicDepartmentController.createDepartment
)

router.get('/:id', AcademicDepartmentController.getSingleDepartment)

router.patch(
  '/:id',
  Validation(AcademicDepartmentValidation.updateAcademicDepartmentZodSchema),
  AcademicDepartmentController.updateDepartment
)

router.delete('/:id', AcademicDepartmentController.deleteDepartment)

router.get('/', AcademicDepartmentController.getAllDepartments)

export const AcademicDepartmentRoute = router
