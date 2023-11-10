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
    StatisticsRoutingModule
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
