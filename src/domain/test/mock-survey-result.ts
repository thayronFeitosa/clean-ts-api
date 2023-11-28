import { SurveyResultModel } from '@/domain/models/survey-result'

export const mockFakeSurveyResultData = (): SurveyResultModel => (
  {
    accountId: 'any_account_id',
    answer: 'any_answer',
    surveyId: 'any_survey_id',
    date: new Date()
  }
)

export const mockFakeSurveyResult = (): SurveyResultModel => Object.assign({}, mockFakeSurveyResultData(), {
  id: 'any_id'
})
