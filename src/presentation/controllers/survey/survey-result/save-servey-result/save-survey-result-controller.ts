import { forbidden } from '@/presentation/helpers/http-helper'
import { HttpRequest, HttpResponse, IController, ILoadSurveysById } from './save-survey-result-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements IController {
  constructor (private readonly loadSurveysById: ILoadSurveysById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveysById.loadById(httpRequest.params.surveyId)

    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'))
    }
    return null
  }
}
