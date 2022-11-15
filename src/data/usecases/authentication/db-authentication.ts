import { IAuthenticationModel, IHashCompare, ILoadAccountBYEnailRepository, ITokenGenerator, IUpdateAccessTokenRepository, IAuthentication } from './db-authentication-protocols'
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
