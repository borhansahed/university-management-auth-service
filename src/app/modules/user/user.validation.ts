import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role path is required',
    }),
    password: z.string().optional(),
  }),
})

export default createUserZodSchema
