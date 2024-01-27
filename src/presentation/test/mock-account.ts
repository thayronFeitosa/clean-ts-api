import { mockFakeAccountModel } from '@/domain/test'
import { AccountModel, AddAccountParams, IAddAccount } from '@/presentation/controllers/login2/signup/signup-controller-protocols'

import { AuthenticationParams, IAuthentication, IValidation } from '@/presentation/controllers/login2/login/login-controller-protocols'

import { ILoadAccountByToken } from '@/presentation/middlewares/auth-middleware-protocols'

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return await new Promise<string>(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}

export const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

export const mockAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add (account: AddAccountParams): Promise<AccountModel | undefined> {
      return await Promise.resolve(mockFakeAccountModel())
    }
  }
  return new AddAccountStub()
}

export const mockLoadAccountByToken = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    async load (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
      return await new Promise<AccountModel>((resolve, reject) => resolve(mockFakeAccountModel()))
    }
  }
  return new LoadAccountByTokenStub()
}
