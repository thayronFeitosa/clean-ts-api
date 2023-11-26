/* eslint-disable @typescript-eslint/no-misused-promises */

import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'
import { adaptRoute } from '@/main/adapters/express-router-adapter'
import { adminAuth } from '@/main/middleware/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', adminAuth, adaptRoute(makeSaveSurveyResultController()))
}
