/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { IController, IEmailValidator, IHttpRequest, IHttpResponse } from '../protocols'

export class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator

  constructor (emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiresFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiresFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { password, passwordConfirmation, email } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) return badRequest(new InvalidParamError('email'))

      return {
        statusCode: 400,
        body: true
      }
    } catch (error) {
      return serverError()
    }
  }
}
