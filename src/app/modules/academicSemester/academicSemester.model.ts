import { Schema, model } from 'mongoose'
import {
  IAcademicSemester,
  IAcademicSemesterModel,
} from './academicSemester.interface'
import { academicSemesterMonth } from './academicSemester.constants'

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
  },

  {
    timestamps: true,
  }
)

const AcademicSemester = model<IAcademicSemester, IAcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
)

export default AcademicSemester
