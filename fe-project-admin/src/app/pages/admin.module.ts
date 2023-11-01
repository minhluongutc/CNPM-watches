import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent
  ],
  imports: [AdminRoutingModule, SharedModule, FormsModule, MatTableModule, MatCheckboxModule],
  exports: [
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    FooterComponent

  ]

})
export class AdminModule {
}
