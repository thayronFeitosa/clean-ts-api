import { ILoadSurveysByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '@/domain/models/survey'
import { ILoadSurveysById } from '@/domain/usecases/load-surveys-by-id'

export class DbLoadSurveyById implements ILoadSurveysById {
  constructor (private readonly loadSurveyByIdepository: ILoadSurveysByIdRepository) {}
  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdepository.loadById(id)
    return survey
  }
}
