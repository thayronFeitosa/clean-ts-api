import { forbidden, serverError, ok } from '@/presentation/helpers/http-helper'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { HttpRequest, SurveyModel, ILoadSurveysById, ISaveSurveyResult, SurveyResultModel, SaveSurveyResultParams } from './save-survey-result-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'
import MockDate from 'mockdate'

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    image: 'any_image'
  }, {
    answer: 'other_answer'
  }],
  date: new Date()

})

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  },
  body: {
    answer: 'any_answer'
  },
  accountId: 'any_account_id'
})

const makeFakeResult = (): SurveyResultModel => ({
  id: 'valid_id',
  surveyId: 'valid_surveyId',
  accountId: 'valid_account_id',
  date: new Date(),
  answer: 'valid_answer'

})

const makeLoadSurveyById = (): ILoadSurveysById => {
  class LoadSurveyByUdStub implements ILoadSurveysById {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise<SurveyModel>((resolve) => resolve(makeFakeSurvey()))
    }
  }

  return new LoadSurveyByUdStub()
}
const makeSaveSurveyResultStub = (): ISaveSurveyResult => {
  class LoadSurveyByUdStub implements ISaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise((resolve) => resolve(makeFakeResult()))
    }
  }

  return new LoadSurveyByUdStub()
}

 type SutTypes = {
   sut: SaveSurveyResultController
   loadSurveyByIdStub: ILoadSurveysById
   saveSurveyResultStub: ISaveSurveyResult
 }

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById()
  const saveSurveyResultStub = makeSaveSurveyResultStub()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)

  return {
    sut,
    loadSurveyByIdStub,
    saveSurveyResultStub
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())

    expect(loadByIdSpy).toBeCalledWith('any_survey_id')
  })

  test('Should return 403 if LoadSurveyById returns  null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 id LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if invalid answer is provided', async () => {
    const { sut } = makeSut()

    const makeRequest = {
      ...makeFakeRequest(),
      body: {
        answer: 'wrong_answer'
      }
    }

    const httpResponse = await sut.handle(makeRequest)

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(makeFakeRequest())

    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      date: new Date(),
      answer: 'any_answer'
    })
  })

  test('Should return 500 id SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeResult()))
  })
})
