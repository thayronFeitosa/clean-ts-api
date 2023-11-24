import { AccountModel } from '@/data/usecases/account/add-account/db-add-account-protocols'

export interface ILoadAccountBYEnailRepository {
  loadByEmail: (email: string) => Promise<AccountModel | null>
}
