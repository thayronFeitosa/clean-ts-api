/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export default {
  mongoUrl: process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://172.20.0.2:27017/clean-node-api',
  port: process.env.PORT ? process.env.PORT : 5050
}
