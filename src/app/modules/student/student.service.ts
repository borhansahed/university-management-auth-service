/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelper } from '../../../helper/paginationHelper'
import { SortOrder } from 'mongoose'
import { IStudent, IStudentFilters } from './student.interface'
import { StudentModel } from './student.model'
import { studentSearchableFields } from './student.constants'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

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
  const result = await StudentModel.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty')
    .populate('academicSemester')

  return result
}

const updateStudent = async (
  id: string,
  payLoad: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExits = await StudentModel.findOne({ id })
  if (!isExits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
  }

  const { name, guardian, localGuardian, ...studentData } = payLoad

  const updateStudent = { ...studentData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      ;(updateStudent as any)[nameKey] = name[key as keyof typeof name]
    })
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`
      ;(updateStudent as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian]
    })
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`
      ;(updateStudent as any)[guardianKey] =
        guardian[key as keyof typeof guardian]
    })
  }
  const result = await StudentModel.findOneAndUpdate({ id }, updateStudent, {
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
