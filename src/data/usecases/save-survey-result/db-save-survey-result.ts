import { ISaveSurveyResultRepository, SaveSurveyResult, SaveSurveyResultModel, SurveyResultModel } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepositoryStub: ISaveSurveyResultRepository) {}
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepositoryStub.save(data)
    return null
  }
}
