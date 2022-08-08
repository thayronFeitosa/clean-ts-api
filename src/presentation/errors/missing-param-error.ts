export class MissingParamError extends Error {
  constructor (paraamName: string) {
    super(`Missing param: ${paraamName}`)
    this.name = 'MissingParamError'
  }
}
