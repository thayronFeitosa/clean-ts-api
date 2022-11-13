import { IAuthentication, IAuthenticationModel } from '../../../domain/usecases/authentication'
import { IHashCompare } from '../../protocols/criptography/hash-compare'
import { ILoadAccountBYEnailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountBYEnailRepository: ILoadAccountBYEnailRepository
  private readonly hashCompare: IHashCompare

  constructor (loadAccountBYEnailRepository: ILoadAccountBYEnailRepository, hashCompare: IHashCompare) {
    this.loadAccountBYEnailRepository = loadAccountBYEnailRepository
    this.hashCompare = hashCompare
  }

  async auth (authentication: IAuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountBYEnailRepository.load(authentication.email)
    if (account != null) {
      await this.hashCompare.compare(authentication.password, account.password)
    }

    return null
  }
}
