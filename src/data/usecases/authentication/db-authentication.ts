import { IAuthentication, IAuthenticationModel } from '../../../domain/usecases/authentication'
import { IHashCompare } from '../../protocols/criptography/hash-compare'
import { ITokenGenerator } from '../../protocols/criptography/toeken-generator'
import { ILoadAccountBYEnailRepository } from '../../protocols/db/load-account-by-email-repository'
import { IUpdateAccessTokenRepository } from '../../protocols/db/update-access-token-repository'

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountBYEnailRepository: ILoadAccountBYEnailRepository
  private readonly hashCompare: IHashCompare
  private readonly tokenGenerator: ITokenGenerator
  private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository

  constructor (
    loadAccountBYEnailRepository: ILoadAccountBYEnailRepository,
    hashCompare: IHashCompare,
    tokenGenerator: ITokenGenerator,
    updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {
    this.loadAccountBYEnailRepository = loadAccountBYEnailRepository
    this.hashCompare = hashCompare
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: IAuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountBYEnailRepository.load(authentication.email)
    if (account != null) {
      const compareIsValid = await this.hashCompare.compare(authentication.password, account.password)
      if (compareIsValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }

    return null
  }
}
