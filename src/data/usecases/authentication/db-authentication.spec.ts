import { IAuthenticationModel } from '../../../domain/usecases/authentication'
import { ILoadAccountBYEnailRepository } from '../../protocols/load-account-by-email-repository'
import { IAccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

const makeFakeAccount = (): IAccountModel => ({
  id: 'any_id',
  name: 'any)name',
  email: 'any_mail@mail.com',
  password: 'any_password'

})

const makeLoadAccountByEmailRepository = (): ILoadAccountBYEnailRepository => {
  class LoadAccountBYEnailRepositoryStub implements ILoadAccountBYEnailRepository {
    async load (email: string): Promise<IAccountModel> {
      const account = makeFakeAccount()
      return await new Promise<IAccountModel>((resolve) => resolve(account))
    }
  }
  return new LoadAccountBYEnailRepositoryStub()
}

const makeFakeAuthentication = (): IAuthenticationModel => {
  return {
    email: 'any_mail@mail.com',
    password: 'any_password'
  }
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: ILoadAccountBYEnailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}
describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountBYEnailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })
})