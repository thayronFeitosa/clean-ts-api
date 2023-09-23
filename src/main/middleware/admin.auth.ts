import { adaptMiddleware } from '../adapters/express-middleware-adapter copy'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export const auth = adaptMiddleware(makeAuthMiddleware('admin'))
