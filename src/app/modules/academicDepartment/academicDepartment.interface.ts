import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/academicFaulty.interface'

export type IAcademicDepartment = {
  title: string
  academicFaculty: Types.ObjectId | IAcademicFaculty
}

export type IAcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>

export type IAcademicDepartmentFilters = {
  searchTerm?: string
  academicFaculty?: Types.ObjectId
}
