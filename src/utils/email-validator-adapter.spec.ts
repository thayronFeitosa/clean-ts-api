import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))
describe('EmailValidator Adapter', () => {
  test('should return false if validator return false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_mail@mail.com')
    expect(isValid).toBe(false)
  })

  test('should return true if validator return true', () => {
    const sut = new EmailValidatorAdapter()

    const isValid = sut.isValid('invalid_mail@mail.com')
    expect(isValid).toBe(true)
  })

  test('should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    sut.isValid('any_mail@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })
})
