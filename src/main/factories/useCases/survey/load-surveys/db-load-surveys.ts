import { DbLoadSurvey } from '@/data/usecases/load-durveys/db-load-surveys'
import { ILoadSurveys } from '@/domain/usecases/load-surveys'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveys = (): ILoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()

  return new DbLoadSurvey(surveyMongoRepository)
}
