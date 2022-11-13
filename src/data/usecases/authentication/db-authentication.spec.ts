import { ILoadAccountBYEnailRepository } from '../../protocols/load-account-by-email-repository'
import { IAccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

describe('DbAuthentication usecase', () => {
  test('Should call LoadAccountBYEnailRepository with correct email', async () => {
    class LoadAccountBYEnailRepositoryStub implements ILoadAccountBYEnailRepository {
      async load (email: string): Promise<IAccountModel> {
        const account: IAccountModel = {
          id: 'any_id',
          name: 'any)name',
          email: 'any_mail@mail.com',
          password: 'any_password'
        }
        return await new Promise<IAccountModel>((resolve) => resolve(account))
      }
    }
    const loadAccountByEmailRepositoryStub = new LoadAccountBYEnailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')

    await sut.auth({
      email: 'any_mail@mail.com',
      password: 'any_password'
    })

    expect(loadSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })
})
