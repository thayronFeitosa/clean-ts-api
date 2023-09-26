import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helper'
import { IController, HttpRequest, HttpResponse, IValidation, IAddSurvey } from './add-survey-protocols'

export class AddSurveyController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly addSurvey: IAddSurvey
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { question, answers } = httpRequest.body
      await this.addSurvey.add({
        answers,
        question,
        date: new Date()
      })
      return noContent()
    } catch (err) {
      return serverError(err)
    }
  }
}
