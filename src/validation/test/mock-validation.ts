import { IValidation } from '@/presentation/protocols'

export const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}
