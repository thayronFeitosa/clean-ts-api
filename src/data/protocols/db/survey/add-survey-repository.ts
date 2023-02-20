import { IAddSurveyModel } from '../../../../domain/usecases/add-survey'

export interface IAddSurveyRepository {
  add: (data: IAddSurveyModel) => Promise<void>
}
