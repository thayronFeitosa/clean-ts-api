import { IHasher } from '@/data/protocols/criptography/hasher'
import { IDecrypter } from '@/data/protocols/criptography/decrypter'
import { IEncrypter } from '@/data/protocols/criptography/encrypter'
import { IHashCompare } from '@/data/protocols/criptography/hash-compare'

export const mockHasher = (): IHasher => {
  class HashStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await new Promise<string>(resolve => resolve('hashed_password'))
    }
  }
  return new HashStub()
}

export const mockEncrypter = (): IEncrypter => {
  class TokenGeneratorStub implements IEncrypter {
    async encrypt (id: string): Promise<string> {
      return await new Promise<string>((resolve) => resolve('any_token'))
    }
  }
  return new TokenGeneratorStub()
}
export const mockDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise<string>((resolve) => resolve('any_token'))
    }
  }
  return new DecrypterStub()
}

export const makeHashCompareStub = (): IHashCompare => {
  class HashCompareStub implements IHashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return await new Promise<boolean>((resolve) => resolve(true))
    }
  }
  return new HashCompareStub()
}
