
import { makeDbLoadSurveyById } from '@/main/factories/useCases/survey/load-survey-by-id/db-load-survey-by-id-factory'
import { SaveSurveyResultController } from '@/presentation/controllers/survey/survey-result/save-servey-result/save-survey-result-controller'
import { IController } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbSaveSurveyResult } from '@/main/factories/useCases/survey-result/save-survey-result/db-save-survey-result-factory'

export const makeSaveSurveyResultController = (): IController => {
  const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
