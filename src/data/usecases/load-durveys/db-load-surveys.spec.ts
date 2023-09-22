import { ISurveyModel } from '../../../domain/models/survey'
import { ILoadSurveysRepository } from '../../protocols/db/survey/load-survey-repository'
import { DbLoadSurvey } from './db-load-surveys'
import MockDate from 'mockdate'

const makeFakeSurveys = (): ISurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      answer: 'any_answer',
      image: 'any_image'
    }, {
      answer: 'other_answer'
    }],
    date: new Date()

  }, {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      answer: 'other_answer',
      image: 'other_image'
    }, {
      answer: 'other_answer'
    }],
    date: new Date()

  }]
}

describe('DbLoadSurvey', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveysRepository', async () => {
    class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
      async loadAll (): Promise<ISurveyModel[]> {
        return await new Promise((resolve) => resolve(makeFakeSurveys()))
      }
    }

    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    const sut = new DbLoadSurvey(loadSurveysRepositoryStub)
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
