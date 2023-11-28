import { ILoadSurveys } from './load-surveys-protocols'
import { LoadSurveysController } from './load-surveys-controler'
import MockDate from 'mockdate'
import { noContent, ok, serverError } from '@/presentation/helpers/http-helper'
import { throwsError, mockSurveyModels } from '@/domain/test'
import { mockLoadSurveys } from '@/presentation/test'

type SutTypes = {
  loadSurveysStub: ILoadSurveys
  sut: LoadSurveysController
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys()
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
  test('Should return 204 on success', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(new Promise((resolve) => resolve([])))

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(mockSurveyModels()))
  })

  test('Should return 500 id LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwsError)
    const promise = await sut.handle({})

    expect(promise).toEqual(serverError(new Error()))
  })
})
