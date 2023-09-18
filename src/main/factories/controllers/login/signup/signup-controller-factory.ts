import { IController } from '../../../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'

import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { SignUpController } from '../../../../../presentation/controllers/login2/signup/signup-controller'
import { makeDbAddAccount } from '../../../useCases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../../useCases/account/authentication/db-authentication-factory'

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
