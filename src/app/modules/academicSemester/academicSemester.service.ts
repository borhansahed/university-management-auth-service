import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import {
  academicSemesterCode,
  academicSemesterSearchableFields,
} from './academicSemester.constants'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import AcademicSemester from './academicSemester.model'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelper } from '../../../helper/paginationHelper'
import { SortOrder } from 'mongoose'

const createSemester = async (
  payLoad: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterCode[payLoad.title] !== payLoad.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }
  const result = await AcademicSemester.create(payLoad)
  return result
}

const getAllSemester = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
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
  const result = await AcademicSemester.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await AcademicSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)

  return result
}

const updateSemester = async (
  id: string,
  payLoad: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payLoad.title &&
    payLoad.code &&
    academicSemesterCode[payLoad.title] !== payLoad.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }

  const result = await AcademicSemester.findByIdAndUpdate(id, payLoad, {
    new: true,
  })
  return result
}

const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id)

  return result
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
