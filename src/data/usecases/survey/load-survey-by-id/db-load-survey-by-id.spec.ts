
import { ILoadSurveysByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '@/domain/models/survey'
import MockDate from 'mockdate'
import { DbLoadSurveyById } from './db-load-survey-by-id.'

const makeFakeSurveys = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      answer: 'any_answer',
      image: 'any_image'
    }, {
      answer: 'other_answer'
    }],
    date: new Date()

  }
}
const makeLoadSurveysByIdRepositoryStub = (): ILoadSurveysByIdRepository => {
  class LoadSurveysByIdRepositoryStub implements ILoadSurveysByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise((resolve) => resolve(makeFakeSurveys()))
    }
  }

  return new LoadSurveysByIdRepositoryStub()
}
type SutTypes = {
  loadSurveysByIdRepositoryStub: ILoadSurveysByIdRepository
  sut: DbLoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveysByIdRepositoryStub = makeLoadSurveysByIdRepositoryStub()
  const sut = new DbLoadSurveyById(loadSurveysByIdRepositoryStub)
  return {
    loadSurveysByIdRepositoryStub,
    sut
  }
}

describe('DbLoadSurveyById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveysByIdRepository', async () => {
    const { sut, loadSurveysByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveysByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return a list of Survey on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadById('any_id')
    expect(surveys).toEqual(makeFakeSurveys())
  })

  test('Should throw if LoadSurveysByIdRepository throws', async () => {
    const { sut, loadSurveysByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadById('any_token')
    await expect(promise).rejects.toThrow()
  })
})
