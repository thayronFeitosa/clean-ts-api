import { IAddAccountRepository } from '@/data/protocols/db/account/add-account-respository'
import { AccountModel, AddAccountParams, ILoadAccountBYEnailRepository } from '@/data/usecases/account/add-account/db-add-account-protocols'
import { mockFakeAccountModel } from '@/domain/test'
import { ILoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { IUpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'

export const mockAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (account: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockFakeAccountModel()
      return await new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): ILoadAccountBYEnailRepository => {
  class LoadAccountBYEnailRepositoryStub implements ILoadAccountBYEnailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return await new Promise<AccountModel>((resolve) => resolve(mockFakeAccountModel()))
    }
  }
  return new LoadAccountBYEnailRepositoryStub()
}

export const mockLoadAccountByTokenRepository = (): ILoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements ILoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(mockFakeAccountModel()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

export const mockUpdateAccessTokenRepository = (): IUpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements IUpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      return await new Promise<void>((resolve) => resolve())
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}
