import { ILogErrorRepository } from '@/data/protocols/db/log/log-error-respository'

export const mockLogErrorRepositoryStub = (): ILogErrorRepository => {
  class LogErrorRepositoryStub implements ILogErrorRepository {
    async logError (stack: string): Promise<void> {
      return await new Promise((resolve) => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}
