/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IAddAccount } from '../../domain/usecases/add-account'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { IController, IEmailValidator, IHttpRequest, IHttpResponse } from '../protocols'

export class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator
  private readonly addAccount: IAddAccount

  constructor (emailValidator: IEmailValidator, addAccount: IAddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiresFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiresFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { password, passwordConfirmation, email, name } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) return badRequest(new InvalidParamError('email'))

      const account = this.addAccount.add({
        email,
        name,
        password
      })
      return {
        statusCode: 400,
        body: account
      }
    } catch (error) {
      return serverError()
    }
  }
}
