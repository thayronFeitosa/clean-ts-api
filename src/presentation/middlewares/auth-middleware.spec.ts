import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http-helper'
import { AuthMiddleware } from './auth-middleware'
import { ILoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { IAccountModel } from '../../domain/models/account'

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

describe('Auth Middleware', () => {
  test('Should return 403 id no x-access-token exists in headers', async () => {
    class LoadAccountByTokenStub implements ILoadAccountByToken {
      async load (accessToken: string, role?: string | undefined): Promise<IAccountModel> {
        return await new Promise<IAccountModel>((resolve, reject) => resolve(makeFakeAccount()))
      }
    }
    const loadAccountByToekenStub = new LoadAccountByTokenStub()
    const sut = new AuthMiddleware(loadAccountByToekenStub)

    const httpRequest = await sut.handle({})
    expect(httpRequest).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    class LoadAccountByTokenStub implements ILoadAccountByToken {
      async load (accessToken: string, role?: string | undefined): Promise<IAccountModel> {
        return await new Promise<IAccountModel>((resolve, reject) => resolve(makeFakeAccount()))
      }
    }
    const loadAccountByToekenStub = new LoadAccountByTokenStub()
    const loadSpy = jest.spyOn(loadAccountByToekenStub, 'load')
    const sut = new AuthMiddleware(loadAccountByToekenStub)

    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
