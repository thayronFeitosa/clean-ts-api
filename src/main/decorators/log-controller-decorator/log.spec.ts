import { IController, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from '../log-controller-decorator/log'
import { serverError, ok } from '@/presentation/helpers/http-helper'
import { ILogErrorRepository } from '@/data/protocols/db/log/log-error-respository'
import { mockFakeAccountModel } from '@/domain/test'
import { mockLogErrorRepositoryStub } from '@/data/test'

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise<HttpResponse>((resolve) => resolve(ok(mockFakeAccountModel())))
    }
  }
  return new ControllerStub()
}
type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: IController
  logErrorRepositoryStub: ILogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = mockLogErrorRepositoryStub()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any@mail.com',
    name: 'any_name',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeServerError = (): HttpResponse => {
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
    expect(httpsResponse).toEqual(ok(mockFakeAccountModel()))
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
