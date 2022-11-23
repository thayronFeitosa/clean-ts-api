/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IAddAccount, IController, IHttpRequest, IHttpResponse, IValidation } from './signup-controller-protocols'
import { badRequest, ok, serverError } from '../../helpers/http-helper'

export class SignUpController implements IController {
  constructor (
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation
  ) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { password, email, name } = httpRequest.body

      const account = await this.addAccount.add({
        email,
        name,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}