/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { InvalidParamError } from '../../errors'
import { IEmailValidator } from '../../protocols'
import { IValidation } from './IValidation'

export class EmailValidation implements IValidation {
  private readonly filedName: string
  private readonly emailValidator: IEmailValidator

  constructor (filedName: string, emailValidator: IEmailValidator) {
    this.filedName = filedName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.filedName])

    if (!isValid) {
      return new InvalidParamError(this.filedName)
    }
    return null
  }
}
