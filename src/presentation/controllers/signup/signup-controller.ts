/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IAddAccount, IController, IHttpRequest, IHttpResponse, IValidation, IAuthentication } from './signup-controller-protocols'
import { badRequest, ok, serverError } from '../../helpers/http-helper'

export class SignUpController implements IController {
  constructor (
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) {
    this.addAccount = addAccount
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { password, email, name } = httpRequest.body

      await this.addAccount.add({
        email,
        name,
        password
      })

      const accessToken = await this.authentication.auth({
        email,
        password
      })

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
