import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {User} from "../../models/user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          // headers: new HttpHeaders().set('Authorization', 'bearer' + user.token)
          setHeaders: {
            'Authorization': 'bearer ' + user.token,
            'Access-Control-Allow-Origin': '*'
          }
        });
        return next.handle(modifiedReq);
      }),
    );
  }
}
