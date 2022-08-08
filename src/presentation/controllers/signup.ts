/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { IController } from '../protocols/controller'
import { IHttpRequest, IHttpResponse } from '../protocols/http'

export class SignUpController implements IController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    const requiresFildes = ['name', 'email', 'password', 'password_confirmation']

    for (const field of requiresFildes) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return {
      statusCode: 400,
      body: true
    }
  }
}
