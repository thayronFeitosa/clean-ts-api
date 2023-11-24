import { SaveSurveyResultController } from './save-survey-result-controller'
import { HttpRequest, SurveyModel, ILoadSurveysById } from './save-survey-result-controller-protocols'

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
  }
})

const makeLoadSurveyById = (): ILoadSurveysById => {
  class LoadSurveyByUdStub implements ILoadSurveysById {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise<SurveyModel>((resolve) => resolve(makeFakeSurvey()))
    }
  }

  return new LoadSurveyByUdStub()
}

 type SutTypes = {
   sut: SaveSurveyResultController
   loadSurveyByIdStub: ILoadSurveysById
 }

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub)

  return {
    sut,
    loadSurveyByIdStub
  }
}

describe('SaveSurveyResult Controller', () => {
  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())

    expect(loadByIdSpy).toBeCalledWith('any_survey_id')
  })
})
