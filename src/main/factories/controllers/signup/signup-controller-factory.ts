import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { IController } from '../../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../useCases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../useCases/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
