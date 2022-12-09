
import { DbAddAccount } from './db-add-account'
import { IAccountModel, IAddAccount, IAddAccountModel, IHasher, IAddAccountRepository, ILoadAccountBYEnailRepository } from './db-add-account-protocols'

const makeEncrypter = (): IHasher => {
  class HashStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await new Promise<string>(resolve => resolve('hashed_password'))
    }
  }
  return new HashStub()
}

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (account: IAddAccountModel): Promise<IAccountModel> {
      const fakeAccount = makeFakeAccount()
      return await new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeLoadAccountByEmailRepository = (): ILoadAccountBYEnailRepository => {
  class LoadAccountBYEnailRepositoryStub implements ILoadAccountBYEnailRepository {
    async loadByEmail (email: string): Promise<IAccountModel | null> {
      return await new Promise<IAccountModel | null>((resolve) => resolve(null))
    }
  }
  return new LoadAccountBYEnailRepositoryStub()
}

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeFaceAccountData = (): IAddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

interface SutTYpes {
  sut: IAddAccount
  hashStub: IHasher
  addAccountRepositoryStub: IAddAccountRepository
  loadAccountByEmailRepositoryStub: ILoadAccountBYEnailRepository
}

const makeSut = (): SutTYpes => {
  const hashStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
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
    const accountData = makeFaceAccountData()
    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
  test('Should th if Encrypter throws', async () => {
    const { hashStub, sut } = makeSut()
    jest.spyOn(hashStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = makeFaceAccountData()
    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })
  test('Should call AddAccountREpository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = makeFaceAccountData()
    await sut.add(accountData)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })
  test('Should th if AddAccountREpository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = makeFaceAccountData()
    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  test('Should call Encrypter with correct password', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFaceAccountData())

    expect(account).toEqual(makeFakeAccount())
  })

  test('Should return null if LoadAccountBYEnailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve) => resolve(makeFakeAccount())))
    await sut.add(makeFaceAccountData())
    expect(loadSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })

  test('Should call LoadAccountBYEnailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(makeFaceAccountData())
    expect(loadSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
