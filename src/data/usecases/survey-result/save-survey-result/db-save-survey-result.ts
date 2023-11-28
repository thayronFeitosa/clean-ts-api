import { ISaveSurveyResultRepository, ISaveSurveyResult, SaveSurveyResultParams, SurveyResultModel } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor (private readonly saveSurveyResultRepositoryStub: ISaveSurveyResultRepository) {}
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepositoryStub.save(data)
    return surveyResult
  }
}
