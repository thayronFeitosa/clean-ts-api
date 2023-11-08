
import { SurveyModel, ILoadSurveys, ILoadSurveysRepository } from './db-load-surveys-protocols'

export class DbLoadSurvey implements ILoadSurveys {
  constructor (private readonly loadSurveyRepository: ILoadSurveysRepository) {}
  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveyRepository.loadAll()
    return surveys
  }
}
