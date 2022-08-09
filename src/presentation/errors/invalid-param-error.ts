export class InvalidParamError extends Error {
  constructor (message: string) {
    super(`Missing param ${message}`)
    this.name = 'InvalidParamError'
  }
}
