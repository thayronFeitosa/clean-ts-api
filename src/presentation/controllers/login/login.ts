/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IAuthentication, IEmailValidator, IHttpRequest, IHttpResponse, IController } from './login-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError, unauthorized } from '../../helpers/http-helper'

export class LoginController implements IController {
  private readonly emailValidator: IEmailValidator
  private readonly authentication: IAuthentication
  constructor (emailValidator: IEmailValidator, authentication: IAuthentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiresFields = ['email', 'password']

      for (const field of requiresFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return await new Promise((resolve) => resolve(badRequest(new InvalidParamError('email'))))
      }

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorized()
      }
      return {
        body: 'ok',
        statusCode: 200
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
