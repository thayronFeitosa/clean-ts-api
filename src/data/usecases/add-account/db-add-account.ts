import { IAccountModel, IAddAccount, IAddAccountModel, IHasher, IAddAccountRepository, ILoadAccountBYEnailRepository } from './db-add-account-protocols'
export class DbAddAccount implements IAddAccount {
  private readonly hasher: IHasher
  private readonly addAccountRepository: IAddAccountRepository
  private readonly loadAccountBYEnailRepository: ILoadAccountBYEnailRepository

  constructor (
    hash: IHasher,
    addAccountRepository: IAddAccountRepository,
    loadAccountBYEnailRepository: ILoadAccountBYEnailRepository
  ) {
    this.hasher = hash
    this.addAccountRepository = addAccountRepository

    this.loadAccountBYEnailRepository = loadAccountBYEnailRepository
  }

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    await this.loadAccountBYEnailRepository.loadByEmail(accountData.email)
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))

    return account
  }
}
