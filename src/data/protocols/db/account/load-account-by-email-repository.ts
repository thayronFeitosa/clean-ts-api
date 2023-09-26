import { AccountModel } from '@/data/usecases/add-account/db-add-account-protocols'

export interface ILoadAccountBYEnailRepository {
  loadByEmail: (email: string) => Promise<AccountModel | null>
}
