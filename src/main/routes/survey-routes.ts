/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'
import { adaptRoute } from '../adapters/express-router-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'

import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { adminAuth } from '../middleware/auth'
import { auth } from '../middleware/admin.auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
