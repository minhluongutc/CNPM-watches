import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home/home.component";
import {LoginListComponent} from "./pages/home/login-list/login-list.component";
import {ShoppingCartComponent} from "./pages/home/shopping-cart/shopping-cart.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";
import {AuthGuardService} from "./core/services/auth-guard.service";

const appRouter: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home', component: HomeComponent,
  },
  {path: 'login', component: LoginListComponent},
  {
    path: 'cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'watches', loadChildren: () =>
      import('./pages/home/watches/watches.module').then((m) => m.WatchesModule)
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRouter)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
