import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.service'

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterInfo } = req.body

    const result = await AcademicSemesterService.createSemester(
      academicSemesterInfo
    )

    res.status(200).send({
      success: true,
      message: 'Academic Semester create Successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const AcademicSemesterController = {
  createSemester,
}
