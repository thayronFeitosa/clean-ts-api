import { mockAddAccountRepository, mockHasher, mockLoadAccountByEmailRepository } from '@/data/test'
import { DbAddAccount } from './db-add-account'
import { IAddAccount, IHasher, IAddAccountRepository, ILoadAccountBYEnailRepository } from './db-add-account-protocols'
import { mockAddAccountParams, mockFakeAccountModel, throwsError } from '@/domain/test'
type SutTYpes = {
  sut: IAddAccount
  hashStub: IHasher
  addAccountRepositoryStub: IAddAccountRepository
  loadAccountByEmailRepositoryStub: ILoadAccountBYEnailRepository
}

const makeSut = (): SutTYpes => {
  const hashStub = mockHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockResolvedValue(Promise.resolve(null))
  const sut = new DbAddAccount(hashStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)

  return {
    sut,
    hashStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { hashStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(hashStub, 'hash')
    const accountData = mockAddAccountParams()
    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('any_password')
  })
  test('Should th if Encrypter throws', async () => {
    const { hashStub, sut } = makeSut()
    jest.spyOn(hashStub, 'hash').mockImplementationOnce(throwsError)
    const accountData = mockAddAccountParams()
    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })
  test('Should call AddAccountREpository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = mockAddAccountParams()
    await sut.add(accountData)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })
  test('Should th if AddAccountREpository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwsError)
    const accountData = mockAddAccountParams()
    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  test('Should call Encrypter with correct password', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAddAccountParams())

    expect(account).toEqual(mockFakeAccountModel())
  })

  test('Should return null if LoadAccountBYEnailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve) => resolve(mockFakeAccountModel())))
    const response = await sut.add(mockAddAccountParams())
    expect(response).toBeNull()
  })

  test('Should call LoadAccountBYEnailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAddAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
