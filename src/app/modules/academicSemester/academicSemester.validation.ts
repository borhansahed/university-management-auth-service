import { z } from 'zod'
import { academicSemesterMonth } from './academicSemester.constants'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),

    code: z.enum(['01', '02', '03'], {
      required_error: 'Code is required',
    }),

    startMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'startMonth is required',
    }),

    endMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'endMonth is required',
    }),
  }),
})

export default createAcademicSemesterZodSchema
