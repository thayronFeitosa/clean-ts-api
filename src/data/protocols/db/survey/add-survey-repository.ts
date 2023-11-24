import { AddSurveyModel } from '@/domain/usecases/survey/add-survey'

export interface IAddSurveyRepository {
  add: (data: AddSurveyModel) => Promise<void>
}
