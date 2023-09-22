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
const makeLoadSurveysRepositoryStub = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    async loadAll (): Promise<ISurveyModel[]> {
      return await new Promise((resolve) => resolve(makeFakeSurveys()))
    }
  }

  return new LoadSurveysRepositoryStub()
}
interface ISutTypes {
  loadSurveysRepositoryStub: ILoadSurveysRepository
  sut: DbLoadSurvey
}

const makeSut = (): ISutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepositoryStub()
  const sut = new DbLoadSurvey(loadSurveysRepositoryStub)
  return {
    loadSurveysRepositoryStub,
    sut
  }
}

describe('DbLoadSurvey', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(makeFakeSurveys())
  })
})
