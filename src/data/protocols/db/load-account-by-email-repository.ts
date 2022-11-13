import { IAccountModel } from '../../usecases/add-account/db-add-account-protocols'

export interface ILoadAccountBYEnailRepository {
  load: (email: string) => Promise<IAccountModel>
}
