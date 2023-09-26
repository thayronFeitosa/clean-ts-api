import { AddSurveyModel } from '@/domain/usecases/add-survey'

export interface IAddSurveyRepository {
  add: (data: AddSurveyModel) => Promise<void>
}
