import {ToastModule} from "primeng/toast";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {StatisticsByMonthComponent} from "./statistics-by-month/statistics-by-month.component";
import {StatisticsByQuarterComponent} from "./statistics-by-quater/statistics-by-quarter.component";
import {StatisticsByBrandComponent} from "./statistics-by-brand/statistics-by-brand.component";
import {
  StatisticsProductsByQuantitySoldLastMonthComponent
} from "./statistics-products-by-quantity-sold-last-month/statistics-products-by-quantity-sold-last-month.component";
import {SharedModule} from "../../shared/shared.module";
import {StatisticsRoutingModule} from "./statistics-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    StatisticsByMonthComponent,
    StatisticsByQuarterComponent,
    StatisticsByBrandComponent,
    StatisticsProductsByQuantitySoldLastMonthComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ToastModule,
    StatisticsRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    StatisticsByMonthComponent,
    StatisticsByQuarterComponent,
    StatisticsByBrandComponent,
    StatisticsProductsByQuantitySoldLastMonthComponent
  ],
})
export class StatisticsModule {
}
