import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ToastModule} from "primeng/toast";
import {AuthComponent} from './auth/auth.component';
import { BillOfSaleComponent } from './bill-of-sale/bill-of-sale.component';
import { ImportInvoiceComponent } from './import-invoice/import-invoice.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    AuthComponent,
    BillOfSaleComponent,
    ImportInvoiceComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    FooterComponent,
    AuthComponent

  ]

})
export class AdminModule {
}
