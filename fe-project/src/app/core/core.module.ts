import {NgModule} from "@angular/core";
import {ShoppingCartService} from "./services/shopping-cart.service";
import {WatchService} from "./services/watch.service";
import {CommonModule, CurrencyPipe, NgOptimizedImage, UpperCasePipe} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {AuthGuardService} from "./services/auth-guard.service";
import {AuthInterceptorService} from "./services/auth-interceptor.service";

@NgModule({
  providers: [
    ShoppingCartService,
    WatchService,
    AuthService,
    MessageService,
    AuthGuardService,
    AuthInterceptorService
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
