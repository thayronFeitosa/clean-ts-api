import { IController, IHttpRequest, IHttpResponse } from '../presentation/protocols'
import { LogControllerDecorator } from './log'
import { serverError, ok } from '../presentation/helpers/http-helper'
import { ILogErrorRepository } from '../data/protocols/log-error-respository'
import { IAccountModel } from '../domain/models/account'
const makeLogErrorRepositoryStub = (): ILogErrorRepository => {
  class LogErrorRepositoryStub implements ILogErrorRepository {
    async logError (stack: string): Promise<void> {
      return await new Promise((resolve) => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
      return await new Promise<IHttpResponse>((resolve) => resolve(ok(makeFakeAccount())))
    }
  }
  return new ControllerStub()
}
interface ISutTypes {
  sut: LogControllerDecorator
  controllerStub: IController
  logErrorRepositoryStub: ILogErrorRepository
}

const makeSut = (): ISutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepositoryStub()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}
const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'

})
const makeFakeRequest = (): IHttpRequest => ({
  body: {
    email: 'any@mail.com',
    name: 'any_name',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeServerError = (): IHttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

describe('LogController Decorator ', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()

    const httpRequest = makeFakeRequest()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should returns the same of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()

    const httpsResponse = await sut.handle(httpRequest)
    expect(httpsResponse).toEqual(ok(makeFakeAccount()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise((resolve) => resolve(makeFakeServerError())))
    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
