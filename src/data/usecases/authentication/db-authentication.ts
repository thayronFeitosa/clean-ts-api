import { IAuthenticationModel, IHashCompare, ILoadAccountBYEnailRepository, IEncrypter, IUpdateAccessTokenRepository, IAuthentication } from './db-authentication-protocols'
export class DbAuthentication implements IAuthentication {
  constructor (
    private readonly loadAccountBYEnailRepository: ILoadAccountBYEnailRepository,
    private readonly hashCompare: IHashCompare,
    private readonly encrypter: IEncrypter,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {
    this.loadAccountBYEnailRepository = loadAccountBYEnailRepository
    this.hashCompare = hashCompare
    this.encrypter = encrypter
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: IAuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountBYEnailRepository.loadByEmail(authentication.email)
    if (account != null) {
      const compareIsValid = await this.hashCompare.compare(authentication.password, account.password)
      if (compareIsValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }

    return null
  }
}
