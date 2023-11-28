import { DbAuthentication } from './db-authentication'
import { mockFakeAuthentication, throwsError } from '@/domain/test'
import {
  IHashCompare,
  ILoadAccountBYEnailRepository,
  IEncrypter,
  IUpdateAccessTokenRepository
} from './db-authentication-protocols'
import { makeHashCompareStub, mockEncrypter, mockLoadAccountByEmailRepository, mockUpdateAccessTokenRepository } from '@/data/test'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: ILoadAccountBYEnailRepository
  hashCompareStub: IHashCompare
  encrypterStub: IEncrypter
  updateAccessTokenRepositoryStub: IUpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hashCompareStub = makeHashCompareStub()
  const encrypterStub = mockEncrypter()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
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
    await sut.auth(mockFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(throwsError)
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountBYEnailRepository return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should return HashCompare if with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(mockFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password')
  })

  test('Should throw if HashCompare throw', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockImplementationOnce(throwsError)
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashCompare return false', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise((resolve) => resolve(false)))
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const compareSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwsError)
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBe('any_token')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')

    await sut.auth(mockFakeAuthentication())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockImplementationOnce(throwsError)
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
