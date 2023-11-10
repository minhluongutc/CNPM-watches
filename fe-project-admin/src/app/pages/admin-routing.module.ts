import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {WatchesComponent} from "./watches/watches.component";
import {AuthGuardService} from "../core/services/auth-guard.service";
import {BillOfSaleComponent} from "./bill-of-sale/bill-of-sale.component";
import {ImportInvoiceComponent} from "./import-invoice/import-invoice.component";

const routes: Routes = [


  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'watches', component: WatchesComponent},
      {path: 'bill-of-sale', component: BillOfSaleComponent},
      {path: 'import-invoice', component: ImportInvoiceComponent},
      {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule)
      }
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {

}
