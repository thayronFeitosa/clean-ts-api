import { IEmailValidator, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { EmailValidation } from '@/validation/validators/email-validation'
import { IValidation } from '@/presentation/protocols/IValidation'
import { makeLoginValidation } from './login-validation-factory'

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

jest.mock('@/validation/validators/validation-composite')
describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: IValidation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
