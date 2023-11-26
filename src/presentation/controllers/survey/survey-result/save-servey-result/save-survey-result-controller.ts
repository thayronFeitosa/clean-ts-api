import { forbidden, serverError } from '@/presentation/helpers/http-helper'
import { HttpRequest, HttpResponse, IController, ILoadSurveysById } from './save-survey-result-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements IController {
  constructor (private readonly loadSurveysById: ILoadSurveysById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const survey = await this.loadSurveysById.loadById(surveyId)

      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return null
    } catch (err) {
      return serverError(err)
    }
  }
}
