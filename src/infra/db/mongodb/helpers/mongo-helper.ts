/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: MongoClient,
  url: null as unknown as string,

  async connect (uri: string): Promise<void> {
    this.url = uri
    const URI = process.env.MONGO_URL ?? uri

    this.client = await MongoClient.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    await this.client.db()
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    await this.connect(this.url)

    return this.client.db().collection(name)
  },

  map (data: any): any {
    const { _id, ...collectionWithoutId } = data
    return Object.assign({}, collectionWithoutId, { id: _id })
  },
  mapCollection (collection: any[]): any[] {
    return collection.map(c => MongoHelper.map(c))
  }
}
