/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MissingParamError } from '../../../errors'
import { badRequest } from '../../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../../protocols'

export class LoginController implements IController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    if (!httpRequest.body.email) {
      return await new Promise((resolve) => resolve(badRequest(new MissingParamError('email'))))
    }

    if (!httpRequest.body.password) {
      return await new Promise((resolve) => resolve(badRequest(new MissingParamError('password'))))
    }
    return {
      body: 'ok',
      statusCode: 200
    }
  }
}
