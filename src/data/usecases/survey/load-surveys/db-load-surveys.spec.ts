import { ILoadSurveysRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { DbLoadSurvey } from './db-load-surveys'
import { throwsError, mockSurveyModels } from '@/domain/test'
import MockDate from 'mockdate'
import { mockLoadSurveysRepositoryStub } from '@/data/test'

type SutTypes = {
  loadSurveysRepositoryStub: ILoadSurveysRepository
  sut: DbLoadSurvey
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepositoryStub()
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
    expect(surveys).toEqual(mockSurveyModels())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwsError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
