import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IMiddleware } from '../protocols'

export class AuthMiddleware implements IMiddleware {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = forbidden(new AccessDeniedError())
    return await new Promise<IHttpResponse>((resolve) => resolve(error))
  }
}
