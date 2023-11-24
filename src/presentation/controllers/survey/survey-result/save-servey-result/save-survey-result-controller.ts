import { HttpRequest, HttpResponse, IController, ILoadSurveysById } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements IController {
  constructor (private readonly loadSurveysById: ILoadSurveysById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveysById.loadById(httpRequest.params.surveyId)
    return null
  }
}
