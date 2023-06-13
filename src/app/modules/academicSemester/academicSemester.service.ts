import { IAcademicSemester } from './academicSemester.interface'
import AcademicSemester from './academicSemester.model'

const createSemester = async (
  payLoad: IAcademicSemester
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payLoad)
  return result
}

export const AcademicSemesterService = {
  createSemester,
}
