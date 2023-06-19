import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelper } from '../../../helper/paginationHelper'
import { SortOrder } from 'mongoose'
import { IStudent, IStudentFilters } from './student.interface'
import { StudentModel } from './student.model'
import { studentSearchableFields } from './student.constants'

const getAllStudent = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await StudentModel.find(whereCondition)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .populate('academicSemester')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await StudentModel.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getStudent = async (id: string): Promise<IStudent | null> => {
  const result = await StudentModel.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .populate('academicSemester')

  return result
}

const updateStudent = async (
  id: string,
  payLoad: Partial<IStudent>
): Promise<IStudent | null> => {
  const result = await StudentModel.findByIdAndUpdate(id, payLoad, {
    new: true,
  })
  return result
}

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await StudentModel.findByIdAndDelete(id)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .populate('academicSemester')

  return result
}

export const StudentService = {
  getAllStudent,
  getStudent,
  updateStudent,
  deleteStudent,
}
