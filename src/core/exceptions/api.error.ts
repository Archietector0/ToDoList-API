import { ApiErrorArgs, ApiErrorBadReq } from "../types";

export class ApiError extends Error {
  private _status: number;
  private _errors: Array<string>;

  constructor ({ status, message, errors = [] }: ApiErrorArgs) {
    super(message)
    this._status = status,
    this._errors = errors
  }

  static UnauthorizedError () {
    return new ApiError({ status: 401, message: 'User is not authorized' })
  }

  static BadRequest ({ message, errors = [] }: ApiErrorBadReq) {
    return new ApiError({ status: 400, message, errors })
  }

  getStatus() {
    return this._status
  }

  getErrors() {
    return this._errors
  }
}