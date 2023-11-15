import {NgModule} from "@angular/core";
import {WatchesComponent} from "./watches.component";
import {WatchesListComponent} from "./watches-list/watches-list.component";
import {WatchesFilterListComponent} from "./watches-filter-list/watches-filter-list.component";
import {WatchItemComponent} from "./watches-list/watch-item/watch-item.component";
import {WatchDetailComponent} from "./watch-detail/watch-detail.component";
import {CommonModule, CurrencyPipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {WatchesRoutingModule} from "./watches-routing.module";
import {RouterLink, RouterModule} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";

@NgModule({
  declarations: [
    WatchesComponent,
    WatchesListComponent,
    WatchesFilterListComponent,
    WatchItemComponent,
    WatchDetailComponent,
  ],
  imports: [
    WatchesRoutingModule,
    RouterLink,
    NgOptimizedImage,
    CurrencyPipe,
    RouterModule,
    CommonModule,
    ToastModule,
    SharedModule,
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule
  ]
})
export class WatchesModule {
}
