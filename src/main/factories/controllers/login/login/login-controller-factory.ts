
import { IController } from '../../../../../presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { LoginController } from '../../../../../presentation/controllers/login2/login/login-controller'
import { makeDbAuthentication } from '../../../useCases/account/authentication/db-authentication-factory'

export const makeLoginController = (): IController => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
