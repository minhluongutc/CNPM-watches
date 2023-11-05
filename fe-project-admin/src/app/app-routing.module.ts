import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthComponent} from "./pages/auth/auth.component";

const appRoutes: Routes = [
  {path: 'login', component: AuthComponent},
  {path: '', loadChildren: () => import('./pages/admin.module').then(m => m.AdminModule)},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
