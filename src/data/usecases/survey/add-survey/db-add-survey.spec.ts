import MockDate from 'mockdate'
import { DbAddSurvey } from './db-add-survey'
import { IAddSurveyRepository } from './db-add-survey-protocols'
import { mockSurveyData, throwsError } from '@/domain/test'
import { mockAddSurveyRepository } from '@/data/test'

type ISutTypes = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: IAddSurveyRepository
}

const makeSut = (): ISutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)

  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const surveyData = mockSurveyData()
    await sut.add(surveyData)

    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should th if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwsError)
    const accountData = mockSurveyData()
    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })
})
