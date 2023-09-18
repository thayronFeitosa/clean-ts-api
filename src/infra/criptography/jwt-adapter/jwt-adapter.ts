import jwt from 'jsonwebtoken'

import { IEncrypter } from '../../../data/protocols/criptography/encrypter'
import { IDecrypter } from '../../../data/protocols/criptography/decrypter'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (private readonly secret: string) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (value: string): Promise<string> {
    await jwt.verify(value, this.secret)
    return null
  }
}
