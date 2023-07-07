import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  options: Record<string, unknown>
): string => {
  return jwt.sign(payload, secret, options)
}
const refreshToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  options: Record<string, unknown>
): string => {
  return jwt.sign(payload, secret, options)
}

const jwtVerify = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}

export const jwtHelper = {
  createToken,
  refreshToken,
  jwtVerify,
}
