import {NgModule} from "@angular/core";
import {DataStorageService} from "./services/data-storage.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {WatchService} from "./services/watch.service";
import {MessageService} from "primeng/api";
import {AuthService} from "./services/auth.service";
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import {AuthGuardService} from "./services/auth-guard.service";

@NgModule({
  providers: [
    DataStorageService,
    WatchService,
    MessageService,
    AuthGuardService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  imports: [HttpClientModule]
})
export class CoreModule {
}
