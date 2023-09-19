import { ISurveyModel, ILoadSurveys } from './load-surveys-protocols'
import { LoadSurveysController } from './load-surveys-controler'
import MockDate from 'mockdate'
import { ok } from '../../../helpers/http-helper'

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
const makeLoadSurvey = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async load (): Promise<ISurveyModel[]> {
      return await new Promise((resolve) => resolve(makeFakeSurveys()))
    }
  }

  return new LoadSurveysStub()
}

interface ISutTypes {
  loadSurveysStub: ILoadSurveys
  sut: LoadSurveysController
}

const makeSut = (): ISutTypes => {
  const loadSurveysStub = makeLoadSurvey()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    loadSurveysStub,
    sut
  }
}
describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys', async () => {
    const { loadSurveysStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })
})
