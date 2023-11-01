import {NgModule} from "@angular/core";
import {ShoppingCartService} from "./services/shopping-cart.service";
import {WatchService} from "./services/watch.service";
import {CommonModule, CurrencyPipe, NgOptimizedImage, UpperCasePipe} from "@angular/common";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  providers: [
    ShoppingCartService,
    WatchService,
  ],
  imports: [
    CommonModule,
    UpperCasePipe,
    CurrencyPipe,
    NgOptimizedImage,
    SharedModule,
  ]
})
export class CoreModule {
}
