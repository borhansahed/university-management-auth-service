import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

const findLastStudentId = async (): Promise<string | undefined> => {
  const lastId = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastId?.id ? lastId.id.substring(4) : undefined
}

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const createUserId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0')
  let incrementId = (parseInt(createUserId) + 1).toString().padStart(5, '0')

  incrementId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementId}`

  return incrementId
}

// faculty Generate Id

const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastId = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  return lastId?.id ? lastId.id.substring(2) : undefined
}

export const generateFacultyId = async () => {
  const createdId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0')
  let incrementId = (parseInt(createdId) + 1).toString().padStart(5, '0')
  incrementId = `F-${incrementId}`

  return incrementId
}
