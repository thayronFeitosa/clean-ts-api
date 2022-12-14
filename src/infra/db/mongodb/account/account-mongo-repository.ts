import { IAddAccountRepository } from '../../../../data/protocols/db/account/add-account-respository'
import { ILoadAccountBYEnailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { IUpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import { IAccountModel } from '../../../../domain/models/account'
import { IAddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements IAddAccountRepository, ILoadAccountBYEnailRepository, IUpdateAccessTokenRepository {
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<IAccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account: Promise<IAccountModel | null> = await accountCollection.findOne({ email })
    return account !== null ? MongoHelper.map(account) : null
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}
