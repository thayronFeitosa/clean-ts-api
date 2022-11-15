export interface IEncrypter {
  encrypt: (key: string) => Promise<string>
}
