import { IAccountModel } from '../../../domain/models/account'
import { IAddAccount, IAddAccountModel } from '../../../domain/usecases/add-account'
import { IEncrypter } from '../../protocols/encrypter'

export class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter

  constructor (encrypter: IEncrypter) {
    this.encrypter = encrypter
  }

  async add (account: IAddAccountModel): Promise<IAccountModel> {
    const { email, name, password } = account
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => resolve({
      id: 'valid_id',
      email,
      name,
      password
    }))
  }
}
