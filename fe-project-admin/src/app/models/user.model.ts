export class User {
  constructor(
    public idUser: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public contact: string,
    public maChucVu: string,
    public image: string,
    public _token: string,
    public _tokenExpirationData: Date,
  ) {
  }

  get token(): string {
    // if (!this._tokenExpirationData || new Date() > this._tokenExpirationData) {
    //   return null;
    // }
    return this._token;
  }
}
