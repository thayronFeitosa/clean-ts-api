import { ILoadSurveysByIdRepository, SurveyModel, ILoadSurveysById } from './db-load-survey-by-id-protocols'

export class DbLoadSurveyById implements ILoadSurveysById {
  constructor (private readonly loadSurveyByIdepository: ILoadSurveysByIdRepository) {}
  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdepository.loadById(id)
    return survey
  }
}
