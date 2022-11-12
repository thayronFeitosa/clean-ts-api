/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { InvalidParamError } from '../../errors'
import { IValidation } from '../../protocols/IValidation'

export class CompareFieldValidation implements IValidation {
  private readonly filedName: string
  private readonly fieldToCompareName: string
  constructor (filedName: string, fieldToCompareName: string) {
    this.filedName = filedName
    this.fieldToCompareName = fieldToCompareName
  }

  validate (input: any): Error | null {
    if (input[this.filedName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
    return null
  }
}
