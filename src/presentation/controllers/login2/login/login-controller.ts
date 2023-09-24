/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IAuthentication, IHttpRequest, IHttpResponse, IController, IValidation } from './login-controller-protocols'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http-helper'

export class LoginController implements IController {
  constructor (private readonly authentication: IAuthentication, private readonly validation: IValidation) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({ email, password })

      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
