
import { IValidation } from '../../../../presentation/protocols/IValidation'
import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { EmailValidation } from '../../../../validation/validators/email-validation'
import { EmailValidatorAdapter } from '../../../../infra/validations/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
