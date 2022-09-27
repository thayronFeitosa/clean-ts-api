import { MissingParamError } from '../../../errors'
import { badRequest } from '../../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../../protocols'

export class LoginController implements IController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return await new Promise((resolve) => resolve(badRequest(new MissingParamError('email'))))
  }
}
