import { RequestHandler } from 'express'

import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { studentFilterableFields } from './student.constants'
import { StudentService } from './student.service'

const getStudents: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'year', 'code'])

  const paginationOptions = pick(req.query, studentFilterableFields)

  const result = await StudentService.getAllStudent(filters, paginationOptions)

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students Data retrieved Successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await StudentService.getStudent(id)

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Data retrieved Successfully',
    data: result,
  })
})

const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await StudentService.updateStudent(id, updatedData)

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Updated Successfully',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await StudentService.deleteStudent(id)

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Deleted Successfully',
    data: result,
  })
})

export const StudentController = {
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
}
