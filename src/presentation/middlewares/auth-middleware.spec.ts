import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http-helper'
import { AuthMiddleware } from './auth-middleware'
import { ILoadAccountByToken, IHttpRequest, IAccountModel } from './auth-middleware-protocols'

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeFakeRequest = (): IHttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const makeLoadAccountByToken = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    async load (accessToken: string, role?: string | undefined): Promise<IAccountModel | null> {
      return await new Promise<IAccountModel>((resolve, reject) => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenStub()
}
interface ITypeSut {
  sut: AuthMiddleware
  loadAccountByTokenStub: ILoadAccountByToken

}

const makeSut = (role?: string): ITypeSut => {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 id no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpRequest = await sut.handle({})
    expect(httpRequest).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('Should return 403 if LoadAccountBuToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountBuToken returns an account', async () => {
    const { sut } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(ok({ accountId: 'valid_id' }))
  })

  test('Should return 500 if LoadAccountBuToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(serverError(new Error()))
  })
})
