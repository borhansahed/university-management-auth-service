import express from 'express'
import { AcademicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import Validation from '../../middleware/Validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user.role'

const router = express.Router()

router.post(
  '/create-faculty',
  Validation(AcademicFacultyValidation.createFacultyZodSchema),
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.createFaculty
)

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.STUDENT),
  AcademicFacultyController.getAllFaculties
)

router.get(
  '/:id',
  auth(
    USER_ROLE.STUDENT,
    USER_ROLE.ADMIN,
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.FACULTY
  ),
  AcademicFacultyController.getSingleFaculty
)

router.patch(
  '/:id',

  Validation(AcademicFacultyValidation.updateFacultyZodSchema),
  auth(USER_ROLE.ADMIN, USER_ROLE.FACULTY, USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.updateFaculty
)

router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.deleteFaculty
)

export const AcademicFacultyRoute = router
