import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { IController } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator/log'

export const makeLogControllerDecorator = (controller: IController): IController => {
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(controller, logMongoRepository)
}
