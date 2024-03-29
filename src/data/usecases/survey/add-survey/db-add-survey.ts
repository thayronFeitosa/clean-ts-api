import { IAddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { IAddSurveyRepository } from './db-add-survey-protocols'

export class DbAddSurvey implements IAddSurvey {
  constructor (private readonly addSurveyRepository: IAddSurveyRepository) {}
  async add (data: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
