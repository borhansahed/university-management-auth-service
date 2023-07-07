import { z } from 'zod'

const loginValidation = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
})
const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refresh Token is required',
    }),
  }),
})

export const AuthValidation = {
  loginValidation,
  refreshTokenValidation,
}
