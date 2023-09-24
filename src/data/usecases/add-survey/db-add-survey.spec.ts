import { IAddSurveyModel } from '@/domain/usecases/add-survey'
import { DbAddSurvey } from './db-add-survey'
import { IAddSurveyRepository } from './db-add-survey-protocols'
import MockDate from 'mockdate'
const makeFakeSurveyData = (): IAddSurveyModel => (
  {
    question: 'asdfasdf',
    answers: [{
      answer: 'any_answer',
      image: 'any_image'
    }],
    date: new Date()
  }
)

const makeAddSurveyRepository = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async add (data: IAddSurveyModel): Promise<void> {
      return await new Promise<void>((resolve) => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

interface ISutTypes {
  sut: DbAddSurvey
  addSurveyRepositoryStub: IAddSurveyRepository
}

const makeSut = (): ISutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository()
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
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)

    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should th if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = makeFakeSurveyData()
    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })
})
