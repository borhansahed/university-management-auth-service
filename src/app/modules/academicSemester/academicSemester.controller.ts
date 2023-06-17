import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'

const createSemester: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicSemesterInfo } = req.body

  const result = await AcademicSemesterService.createSemester(
    academicSemesterInfo
  )

  res.status(httpStatus.OK).send({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester create Successfully',
    data: result,
  })
})

const getAllSemester: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'year', 'code'])

  const paginationOptions = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ])

  const result = await AcademicSemesterService.getAllSemester(
    filters,
    paginationOptions
  )

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Data',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleSemester: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await AcademicSemesterService.getSingleSemester(id)

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Data Get Successfully',
    data: result,
  })
})

const updateSemester = catchAsync(async (req, res) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await AcademicSemesterService.updateSemester(id, updatedData)

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Update Successfully',
    data: result,
  })
})

const deleteSemester = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await AcademicSemesterService.deleteSemester(id)

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Deleted Successfully',
    data: result,
  })
})

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
