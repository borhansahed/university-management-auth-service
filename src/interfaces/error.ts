export type IGenericErrorMessage = {
  path: string | number
  message: string
}

export type IGenericCommonError = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}
