import { IAddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { ILoadSurveysByIdRepository } from '../protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { ILoadSurveysRepository } from '@/data/protocols/db/survey/load-survey-repository'

export const mockAddSurveyRepository = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async add (data: AddSurveyParams): Promise<void> {
      return await new Promise<void>((resolve) => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}
export const mockLoadSurveyByIdRepositoryStub = (): ILoadSurveysByIdRepository => {
  class LoadSurveysByIdRepositoryStub implements ILoadSurveysByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise((resolve) => resolve(mockSurveyModel()))
    }
  }

  return new LoadSurveysByIdRepositoryStub()
}

export const mockLoadSurveysRepositoryStub = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await new Promise((resolve) => resolve(mockSurveyModels()))
    }
  }

  return new LoadSurveysRepositoryStub()
}
