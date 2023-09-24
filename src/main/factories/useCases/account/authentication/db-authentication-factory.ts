import env from '@/main/config/env'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/BcryptAdapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { IAuthentication } from '@/domain/usecases/authentication'

export const makeDbAuthentication = (): IAuthentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
