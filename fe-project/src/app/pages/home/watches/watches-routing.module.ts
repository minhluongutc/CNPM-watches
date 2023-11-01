import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WatchesComponent} from "./watches.component";
import {WatchDetailComponent} from "./watch-detail/watch-detail.component";

const routes: Routes = [
  {
    path: '',
    component: WatchesComponent
  },
  {
    path: ':id',
    component: WatchDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchesRoutingModule {

}
