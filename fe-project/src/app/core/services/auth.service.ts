import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {AuthResponseData} from "../../models/AuthResponseData.model";

@Injectable()
export class AuthService {
  apiUrl = 'http://127.0.0.1:8000/api/auth/user'

  private tokenExpirationTimer: any;
  // @ts-ignore
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);


  constructor(private http: HttpClient, private router: Router) {
  }

  register(fullName: string, gender: string, address: string, phoneNumber: string, email: string, password: string): Observable<AuthResponseData> {
    const url = `${this.apiUrl}/register`;
    return this.http
      .post<AuthResponseData>(
        url,
        {
          tenKhachHang: fullName,
          gioiTinh: gender,
          diaChi: address,
          SDT: phoneNumber,
          email: email,
          password: password,
          returnSecureToken: true
        },
      )
      .pipe(
        catchError(this.handleError),
        tap((resData: AuthResponseData) => {
          this.handleAuthentication(
            resData.user.maKhachHang,
            resData.user.tenKhachHang,
            resData.user.gioiTinh,
            resData.user.diaChi,
            resData.user.SDT,
            resData.user.email,
            resData.access_token,
            +resData.expires_in
          )
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    const url = `${this.apiUrl}/login`;
    return this.http
      .post<AuthResponseData>(
        url,
        {
          email: email,
          password: password,
          returnSecureToken: true
        },
      )
      .pipe(
        catchError(this.handleError),
        tap((resData: AuthResponseData) => {
          this.handleAuthentication(
            resData.user.maKhachHang,
            resData.user.tenKhachHang,
            resData.user.gioiTinh,
            resData.user.diaChi,
            resData.user.SDT,
            resData.user.email,
            resData.access_token,
            +resData.expires_in
          )
        })
      );
  }

  autoLogin() {
    const userDataString: string | null = localStorage.getItem('userData');

    const userData: {
      maKhachHang: string;
      tenKhachHang: string;
      gioiTinh: string;
      diaChi: string;
      SDT: string;
      email: string;
      _token: string;
      _tokenExpirationData: string;
    } = userDataString ? JSON.parse(userDataString) : null;

    if (!userData) {
      return;
    }

    const loadedUser: User = new User(
      userData.maKhachHang,
      userData.tenKhachHang,
      userData.gioiTinh,
      userData.diaChi,
      userData.SDT,
      userData.email,
      userData._token,
      new Date(userData._tokenExpirationData)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationData).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    // @ts-ignore
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleAuthentication(
    userId: string,
    fullName: string,
    gender: string,
    address: string,
    phoneNumber: string,
    email: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user: User = new User(userId, fullName, gender, address, phoneNumber, email, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    console.log(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes)
    let errorMessage = '';
    // if (!errorRess.error)
    return throwError(errorMessage);
  }
}
