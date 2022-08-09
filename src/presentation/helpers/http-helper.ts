import { ServerError } from '../errors/server-error'
import { IHttpResponse } from '../protocols/http'

export const badRequest = (error: Error): IHttpResponse => ({
  body: error,
  statusCode: 400
})

export const serverError = (): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
