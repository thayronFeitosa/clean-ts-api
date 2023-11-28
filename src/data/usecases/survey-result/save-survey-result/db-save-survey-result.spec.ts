import { mockFakeSurveyResult, mockFakeSurveyResultData, throwsError } from '@/domain/test'
import { DbSaveSurveyResult } from './db-save-survey-result'
import { ISaveSurveyResultRepository, SaveSurveyResultParams } from './db-save-survey-result-protocols'
import MockDate from 'mockdate'

const mockSaveSurveyResultRepository = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SaveSurveyResultParams> {
      return await new Promise((resolve) => resolve(mockFakeSurveyResult()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

type ISutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
}

const makeSut = (): ISutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)

  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const surveyResultData = mockFakeSurveyResultData()
    await sut.save(surveyResultData)

    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('Should th if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwsError)
    const accountData = mockFakeSurveyResultData()
    const promise = sut.save(accountData)

    await expect(promise).rejects.toThrow()
  })

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveysResult = await sut.save(mockFakeSurveyResultData())
    expect(surveysResult).toEqual(mockFakeSurveyResult())
  })
})
