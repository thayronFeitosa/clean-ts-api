/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { InvalidParamError } from '@/presentation/errors'
import { IValidation } from '@/presentation/protocols/IValidation'

export class CompareFieldValidation implements IValidation {
  constructor (
    private readonly filedName: string,
    private readonly fieldToCompareName: string
  ) {
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
