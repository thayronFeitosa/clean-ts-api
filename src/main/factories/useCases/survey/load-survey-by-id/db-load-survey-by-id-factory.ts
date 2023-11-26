import { DbLoadSurveyById } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id.'
import { ILoadSurveysById } from '@/domain/usecases/survey/load-surveys-by-id'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveyById = (): ILoadSurveysById => {
  const surveyMongoRepository = new SurveyMongoRepository()

  return new DbLoadSurveyById(surveyMongoRepository)
}
