import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { mockFakeSurveyResultModel } from '@/domain/test'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { SurveyResultModel } from '../usecases/survey-result/save-survey-result/db-save-survey-result-protocols'

export const mockSaveSurveyResultRepository = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    // async save (data: SaveSurveyResultParams): Promise<SaveSurveyResultParams> {
      return await new Promise((resolve) => resolve(mockFakeSurveyResultModel()))
    // }
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
