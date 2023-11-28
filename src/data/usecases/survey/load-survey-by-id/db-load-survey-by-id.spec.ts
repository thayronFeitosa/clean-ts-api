
import { ILoadSurveysByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import MockDate from 'mockdate'
import { DbLoadSurveyById } from './db-load-survey-by-id.'
import { throwsError, mockSurveyModel } from '@/domain/test'
import { mockLoadSurveyByIdRepositoryStub } from '@/data/test'

type SutTypes = {
  loadSurveysByIdRepositoryStub: ILoadSurveysByIdRepository
  sut: DbLoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveysByIdRepositoryStub = mockLoadSurveyByIdRepositoryStub()
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
    expect(surveys).toEqual(mockSurveyModel())
  })

  test('Should throw if LoadSurveysByIdRepository throws', async () => {
    const { sut, loadSurveysByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysByIdRepositoryStub, 'loadById').mockImplementationOnce(throwsError)
    const promise = sut.loadById('any_token')
    await expect(promise).rejects.toThrow()
  })
})
