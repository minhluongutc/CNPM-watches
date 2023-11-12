import {NgModule} from "@angular/core";
import {CartService} from "./services/cart.service";
import {WatchService} from "./services/watch.service";
import {CommonModule, CurrencyPipe, NgOptimizedImage, UpperCasePipe} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {AuthService} from "./services/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {AuthGuardService} from "./services/auth-guard.service";
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import {CheckoutService} from "./services/checkout.service";

@NgModule({
  providers: [
    CartService,
    WatchService,
    AuthService,
    MessageService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    CheckoutService,
  ],
  imports: [
    CommonModule,
    UpperCasePipe,
    CurrencyPipe,
    NgOptimizedImage,
    SharedModule,
    HttpClientModule
  ]
})
export class CoreModule {
}
