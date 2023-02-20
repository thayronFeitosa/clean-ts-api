
import { IController } from '../../../../presentation/protocols'
import { makeDbAuthentication } from '../../useCases/authentication/db-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoginController } from '../../../../presentation/controllers/login2/login/login-controller'

export const makeLoginController = (): IController => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
