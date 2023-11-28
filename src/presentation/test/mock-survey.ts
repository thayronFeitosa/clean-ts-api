import { AddSurveyParams, IAddSurvey } from '@/presentation/controllers/survey/add-survey/add-survey-protocols'
import { ILoadSurveys, SurveyModel } from '../controllers/survey/load-surveys/load-surveys-protocols'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { ILoadSurveysById } from '@/presentation/controllers/survey/survey-result/save-servey-result/save-survey-result-controller-protocols'

export const mockAddSurvey = (): IAddSurvey => {
  class AddSurveyStub implements IAddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return await new Promise<void>((resolve) => resolve())
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise((resolve) => resolve(mockSurveyModels()))
    }
  }

  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): ILoadSurveysById => {
  class LoadSurveyByUdStub implements ILoadSurveysById {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise<SurveyModel>((resolve) => resolve(mockSurveyModel()))
    }
  }

  return new LoadSurveyByUdStub()
}
