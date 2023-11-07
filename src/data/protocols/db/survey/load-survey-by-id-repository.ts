import { SurveyModel } from '@/domain/models/survey'

export interface ILoadSurveysByIdRepository {
  loadById: (id: string) => Promise<SurveyModel>
}
