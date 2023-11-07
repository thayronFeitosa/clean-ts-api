import { SurveyModel } from '@/domain/models/survey'
import { ILoadSurveys } from '@/domain/usecases/load-surveys'
import { ILoadSurveysRepository } from '@/data/protocols/db/survey/load-survey-repository'

export class DbLoadSurvey implements ILoadSurveys {
  constructor (private readonly loadSurveyRepository: ILoadSurveysRepository) {}
  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveyRepository.loadAll()
    return surveys
  }
}
