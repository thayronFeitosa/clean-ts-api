import { IAuthentication, IAuthenticationModel } from '../../../domain/usecases/authentication'
import { ILoadAccountBYEnailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountBYEnailRepository: ILoadAccountBYEnailRepository

  constructor (loadAccountBYEnailRepository: ILoadAccountBYEnailRepository) {
    this.loadAccountBYEnailRepository = loadAccountBYEnailRepository
  }

  async auth (authentication: IAuthenticationModel): Promise<string | undefined> {
    await this.loadAccountBYEnailRepository.load(authentication.email)

    return undefined
  }
}
