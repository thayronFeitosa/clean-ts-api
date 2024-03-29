import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/BcryptAdapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { IAddAccount } from '@/domain/usecases/account/add-account'
import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'

export const makeDbAddAccount = (): IAddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()

  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
