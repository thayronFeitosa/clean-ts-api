import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { IValidation } from '../../../presentation/protocols/IValidation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validate'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { IEmailValidator } from '../../../presentation/protocols'
import { makeLoginValidation } from './login-validation'

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

jest.mock('../../../presentation/helpers/validators/validation-composite')
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
