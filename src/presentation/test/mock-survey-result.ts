import { mockFakeSurveyResultModel } from '@/domain/test'
import { ISaveSurveyResult, SaveSurveyResultParams, SurveyResultModel } from '@/presentation/controllers/survey/survey-result/save-servey-result/save-survey-result-controller-protocols'

export const mockSaveSurveyResultStub = (): ISaveSurveyResult => {
  class LoadSurveyByUdStub implements ISaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise((resolve) => resolve(mockFakeSurveyResultModel()))
    }
  }

  return new LoadSurveyByUdStub()
}
