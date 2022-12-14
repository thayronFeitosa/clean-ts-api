
import validator from 'validator'
import { IEmailValidator } from '../../validation/validators'
export class EmailValidatorAdapter implements IEmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
