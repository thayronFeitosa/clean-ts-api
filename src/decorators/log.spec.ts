import { IController, IHttpRequest, IHttpResponse } from '../presentation/protocols'
import { LogControllerDecorator } from './log'

interface ISutTypes {
  controllerStub: IController
  sut: LogControllerDecorator
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

const makeSut = (): ISutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    controllerStub,
    sut
  }
}

describe('LogController Decorator ', () => {
  const { sut, controllerStub } = makeSut()
  test('Should call controller handle', async () => {
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
})
