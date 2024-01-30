import request from 'supertest'
import { noCache } from './no-cache'
import app from '../config/app'

describe('NoCache Middleware', () => {
  test('should disable cache ', async () => {
    app.get('/test_no_cache', noCache, (request, response) => {
      response.send()
    })
    await request(app)
      .get('/test_no_cache')
      .expect('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('Pragma', 'no-cache')
      .expect('Expires', '0')
      .expect('Surrogate-Control', 'no-store')
  })
})
