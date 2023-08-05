export type RegistrationCredentials = {
  email: string,
  password: string
}

export type TokenPair = {
  accessToken: string,
  refreshToken: string
}

export type ApiErrorArgs = {
  status: number,
  message: string,
  errors?: Array<string>
}

export type ApiErrorBadReq = {
  message: string,
  errors?: Array<any>
}