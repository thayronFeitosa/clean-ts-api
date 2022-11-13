import { IAuthenticationModel } from '../../../domain/usecases/authentication'
import { IHashCompare } from '../../protocols/criptography/hash-compare'
import { ILoadAccountBYEnailRepository } from '../../protocols/db/load-account-by-email-repository'
import { IAccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

const makeFakeAccount = (): IAccountModel => ({
  id: 'any_id',
  name: 'any)name',
  email: 'any_mail@mail.com',
  password: 'hashed_password'

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

const makeHashCompareStub = (): IHashCompare => {
  class HashCompareStub implements IHashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return await new Promise<boolean>((resolve) => resolve(true))
    }
  }
  return new HashCompareStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: ILoadAccountBYEnailRepository
  hashCompareStub: IHashCompare
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashCompareStub = makeHashCompareStub()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashCompareStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub
  }
}
describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountBYEnailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountBYEnailRepository return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should return HashCompare if with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(makeFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashCompare throw', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
