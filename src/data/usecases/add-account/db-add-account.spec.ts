import { IAddAccount } from '../../../domain/usecases/add-account'
import { IEncrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface SutTYpes {
  sut: IAddAccount
  encrypterStub: IEncrypter
}

const makeSut = (): SutTYpes => {
  class EncrypterStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise<string>(resolve => resolve('hashed_password'))
    }
  }
  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
