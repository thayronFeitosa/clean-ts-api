import { IAddSurveyModel } from '../../../domain/usecases/add-survey'
import { DbAddSurvey } from './db-add-survey'
import { IAddSurveyRepository } from './db-add-survey-protocols'

const makeFakeSurveyData = (): IAddSurveyModel => (
  {
    question: 'asdfasdf',
    answers: [{
      answer: 'any_answer',
      image: 'any_image'
    }]
  }
)
describe('DbAddSurvey Usecase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements IAddSurveyRepository {
      async add (data: IAddSurveyModel): Promise<void> {
        return await new Promise<void>((resolve) => resolve())
      }
    }
    const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const sut = new DbAddSurvey(addSurveyRepositoryStub)
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)

    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
})
