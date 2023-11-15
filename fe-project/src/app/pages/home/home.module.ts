import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {LoginListComponent} from "./login-list/login-list.component";
import {LoginComponent} from "./login-list/login/login.component";
import {RegisterComponent} from "./login-list/register/register.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {RouterModule} from "@angular/router";
import {CommonModule, NgForOf, NgIf, NgOptimizedImage, UpperCasePipe} from "@angular/common";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {HeaderMainComponent} from "./header/header-main/header-main.component";
import {CartItemMiniComponent} from "./header/header-main/cart-item-mini/cart-item-mini.component";
import {HeaderMainNavComponent} from "./header/header-main-nav/header-main-nav.component";
import {WatchesModule} from "./watches/watches.module";
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {BillComponent} from './bill/bill.component';
import {ProfileComponent} from './profile/profile.component';
import {MatRippleModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {WishlistComponent} from './header/header-main/wishlist/wishlist.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginListComponent,
    LoginComponent,
    RegisterComponent,
    ShoppingCartComponent,
    HeaderComponent,
    HeaderMainComponent,
    CartItemMiniComponent,
    HeaderMainNavComponent,
    FooterComponent,
    BillComponent,
    ProfileComponent,
    WishlistComponent,
  ],
  exports: [
    HomeComponent,
    ShoppingCartComponent,
    HeaderComponent,
    FooterComponent,
    CartItemMiniComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    WatchesModule,
    CoreModule,
    UpperCasePipe,
    SharedModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    ToastModule,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule,
    MatRippleModule,
    MatTableModule,
    MatCheckboxModule,
    MatTableModule,
    MatTableModule,
    MatTableModule
  ],
  providers: [
    CartItemMiniComponent
  ]
})
export class HomeModule {
}
