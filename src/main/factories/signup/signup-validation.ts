
import { CompareFieldValidation } from '../../../presentation/helpers/validators/compare-field-validate'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { IValidation } from '../../../presentation/helpers/validators/IValidation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validate'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeSignUpValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
