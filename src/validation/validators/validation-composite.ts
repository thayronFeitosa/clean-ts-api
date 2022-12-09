import { IValidation } from '../../presentation/protocols/IValidation'

export class ValidationComposite implements IValidation {
  constructor (private readonly validations: IValidation[]) {
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
