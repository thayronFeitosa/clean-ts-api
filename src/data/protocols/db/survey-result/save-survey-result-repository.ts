import { SurveyResultModel } from '@/domain/models/survey-result'

export interface ISaveSurveyResultRepository {
  save: (data: SurveyResultModel) => Promise<SurveyResultModel>
}
