import { ILogErrorRepository } from '@/data/protocols/db/log/log-error-respository'
import { IController, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LogControllerDecorator implements IController {
  constructor (
    private readonly controller: IController,
    private readonly logErrorRepository: ILogErrorRepository
  ) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
