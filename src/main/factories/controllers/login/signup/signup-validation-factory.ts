
import { IValidation } from '../../../../../presentation/protocols/IValidation'
import { CompareFieldValidation, RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { EmailValidation } from '../../../../../validation/validators/email-validation'
import { EmailValidatorAdapter } from '../../../../../infra/validations/email-validator-adapter'

export const makeSignUpValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
