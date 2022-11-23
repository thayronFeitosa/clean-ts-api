import { IAccountModel } from '../../usecases/add-account/db-add-account-protocols'

export interface ILoadAccountBYEnailRepository {
  loadByEmail: (email: string) => Promise<IAccountModel | null>
}
