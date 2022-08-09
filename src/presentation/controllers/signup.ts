/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'
import { badRequest } from '../helpers/http-helper'
import { IController } from '../protocols/controller'
import { IEmailValidator } from '../protocols/email-validator'
import { IHttpRequest, IHttpResponse } from '../protocols/http'

export class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator

  constructor (emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: IHttpRequest): IHttpResponse {
    const requiresFields = ['name', 'email', 'password', 'password_confirmation']

    for (const field of requiresFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    console.log(isValid)

    if (!isValid) return badRequest(new InvalidParamError('email'))

    return {
      statusCode: 400,
      body: true
    }
  }
}
