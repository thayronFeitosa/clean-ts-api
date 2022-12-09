import { DbAuthentication } from './db-authentication'
import {
  IAccountModel,
  IAuthenticationModel,
  IHashCompare,
  ILoadAccountBYEnailRepository,
  IEncrypter,
  IUpdateAccessTokenRepository
} from './db-authentication-protocols'

const makeFakeAccount = (): IAccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_mail@mail.com',
  password: 'hashed_password'

})

const makeLoadAccountByEmailRepository = (): ILoadAccountBYEnailRepository => {
  class LoadAccountBYEnailRepositoryStub implements ILoadAccountBYEnailRepository {
    async loadByEmail (email: string): Promise<IAccountModel> {
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

const makeEncrypter = (): IEncrypter => {
  class TokenGeneratorStub implements IEncrypter {
    async encrypt (id: string): Promise<string> {
      return await new Promise<string>((resolve) => resolve('any_token'))
    }
  }
  return new TokenGeneratorStub()
}

const makeUpdateAccessTokenRepository = (): IUpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements IUpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      return await new Promise<void>((resolve) => resolve())
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: ILoadAccountBYEnailRepository
  hashCompareStub: IHashCompare
  encrypterStub: IEncrypter
  updateAccessTokenRepositoryStub: IUpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashCompareStub = makeHashCompareStub()
  const encrypterStub = makeEncrypter()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}
describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountBYEnailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountBYEnailRepository return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve) => resolve(null)))
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

  test('Should return null if HashCompare return false', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise((resolve) => resolve(false)))
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const compareSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(makeFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBe('any_token')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')

    await sut.auth(makeFakeAuthentication())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
