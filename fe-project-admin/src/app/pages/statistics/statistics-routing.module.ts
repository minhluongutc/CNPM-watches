import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StatisticsByMonthComponent} from "./statistics-by-month/statistics-by-month.component";
import {StatisticsByQuarterComponent} from "./statistics-by-quater/statistics-by-quarter.component";
import {StatisticsByBrandComponent} from "./statistics-by-brand/statistics-by-brand.component";
import {
  StatisticsProductsByQuantitySoldLastMonthComponent
} from "./statistics-products-by-quantity-sold-last-month/statistics-products-by-quantity-sold-last-month.component";

const routes: Routes = [
  {
    path: 'statisticsByMonth',
    component: StatisticsByMonthComponent,
  },
  {
    path: 'statisticsByQuarter',
    component: StatisticsByQuarterComponent
  },
  {
    path: 'statisticsByBrand',
    component: StatisticsByBrandComponent
  },
  {
    path: 'statisticsByProductsSold',
    component: StatisticsProductsByQuantitySoldLastMonthComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule {

}
