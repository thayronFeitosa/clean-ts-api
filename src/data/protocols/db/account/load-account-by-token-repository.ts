import { IAccountModel } from '@/data/usecases/add-account/db-add-account-protocols'

export interface ILoadAccountByTokenRepository {
  loadByToken: (accessToken: string, role?: string) => Promise<IAccountModel | null>
}
