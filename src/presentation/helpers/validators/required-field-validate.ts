/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MissingParamError } from '../../errors'
import { IValidation } from '../../protocols/IValidation'

export class RequiredFieldValidation implements IValidation {
  constructor (private readonly filedName: string) {
    this.filedName = filedName
  }

  validate (input: any): Error | null {
    if (!input[this.filedName]) {
      return new MissingParamError(this.filedName)
    }
    return null
  }
}
