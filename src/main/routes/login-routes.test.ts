import { hash } from 'bcrypt'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountCollection
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup ', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Rodrigo',
          email: 'rodrigo@email.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on signup ', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Rodrigo',
        email: 'rodrigo@email.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'rodrigo@email.com',
          password: '123'

        })
        .expect(200)
    })

    test('Should return 401 on signup ', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'rodrigo@email.com',
          password: '123'

        })
        .expect(401)
    })
  })
})
