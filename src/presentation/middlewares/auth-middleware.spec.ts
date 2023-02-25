import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http-helper'
import { AuthMiddleware } from './auth-middleware'

describe('Auth Middleware', () => {
  test('Should return 403 id no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware()

    const httpRequest = await sut.handle({})
    expect(httpRequest).toEqual(forbidden(new AccessDeniedError()))
  })
})
