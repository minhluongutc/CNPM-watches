export class User {
  constructor(
    public maKhachHang: string,
    public tenKhachHang: string,
    public gioiTinh: string,
    public diaChi: string,
    public SDT: string,
    public email: string,
    public _token: string,
    public _tokenExpirationData: Date
  ) {
  }

  get token(): string {
    return this._token;
  }

}
