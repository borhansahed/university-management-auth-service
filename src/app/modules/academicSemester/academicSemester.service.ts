import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { academicSemesterCode } from './academicSemester.constants'
import { IAcademicSemester } from './academicSemester.interface'
import AcademicSemester from './academicSemester.model'

const createSemester = async (
  payLoad: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterCode[payLoad.title] !== payLoad.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }
  const result = await AcademicSemester.create(payLoad)
  return result
}

export const AcademicSemesterService = {
  createSemester,
}
