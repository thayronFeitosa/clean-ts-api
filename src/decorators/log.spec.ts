import { IController, IHttpRequest, IHttpResponse } from '../presentation/protocols'
import { LogControllerDecorator } from './log'
import { serverError } from '../presentation/helpers/http-helper'
import { ILogErrorRepository } from '../data/protocols/log-error-respository'

const makeLogErrorRepositoryStub = (): ILogErrorRepository => {
  class LogErrorRepositoryStub implements ILogErrorRepository {
    async log (stack: string): Promise<void> {
      return await new Promise((resolve) => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
      const httpResponse = {
        body: {
          name: 'thayron'
        },
        statusCode: 200
      }
      return await new Promise<IHttpResponse>((resolve) => resolve(httpResponse))
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

describe('LogController Decorator ', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()

    const httpRequest = {
      body: {
        email: 'any@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should returns the same of the controller', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpsResponse = await sut.handle(httpRequest)
    expect(httpsResponse).toEqual({
      body: {
        name: 'thayron'
      },
      statusCode: 200
    })
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise((resolve) => resolve(error)))
    const httpRequest = {
      body: {
        email: 'any@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
