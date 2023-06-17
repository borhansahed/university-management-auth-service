import { z } from 'zod'
import { academicSemesterMonth } from './academicSemester.constants'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Title is required',
    }),
    year: z.string({
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

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum(['Autumn', 'Summer', 'Fall'], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required',
        })
        .optional(),

      code: z
        .enum(['01', '02', '03'], {
          required_error: 'Code is required',
        })
        .optional(),

      startMonth: z
        .enum([...academicSemesterMonth] as [string, ...string[]], {
          required_error: 'startMonth is required',
        })
        .optional(),

      endMonth: z
        .enum([...academicSemesterMonth] as [string, ...string[]], {
          required_error: 'endMonth is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  )

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}
