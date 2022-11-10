import { IValidation } from './IValidation'

export class ValidationComposite implements IValidation {
  private readonly validations: IValidation[]
  constructor (validations: IValidation[]) {
    this.validations = validations
  }

  validate (input: any): Error | null {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error != null) {
        return error
      }
    }
    return null
  }
}
