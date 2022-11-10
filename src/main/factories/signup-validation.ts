
import { IValidation } from '../../presentation/helpers/validators/IValidation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validate'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'

export const makeSignUpValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
