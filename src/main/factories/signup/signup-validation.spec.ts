import { CompareFieldValidation } from '../../../presentation/helpers/validators/compare-field-validate'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { IValidation } from '../../../presentation/protocols/IValidation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validate'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { IEmailValidator } from '../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation'

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

jest.mock('../../../presentation/helpers/validators/validation-composite')
describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
