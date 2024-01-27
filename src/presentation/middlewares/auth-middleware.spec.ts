import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http-helper'
import { mockLoadAccountByToken } from '@/presentation/test'
import { AuthMiddleware } from './auth-middleware'
import { ILoadAccountByToken, HttpRequest } from './auth-middleware-protocols'
import { throwsError } from '@/domain/test'

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenStub: ILoadAccountByToken

}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = mockLoadAccountByToken()
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
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(Promise.resolve(null))
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountBuToken returns an account', async () => {
    const { sut } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(ok({ accountId: 'any_id' }))
  })

  test('Should return 500 if LoadAccountBuToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(throwsError)
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(serverError(new Error()))
  })
})
