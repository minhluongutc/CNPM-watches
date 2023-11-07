import {NgModule} from '@angular/core';
import {ScrollDirective} from './layout/directives/scroll.directive';
import {NgIf, UpperCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";
import {DropdownDirective} from "./directive/dropdown.directive";

@NgModule({
  declarations: [ScrollDirective, PageNotFoundComponent, LoadingSpinnerComponent, DropdownDirective],
  imports: [
    UpperCasePipe,
    RouterLink,
    NgIf
  ],
  exports: [ScrollDirective, LoadingSpinnerComponent, DropdownDirective],
})
export class SharedModule {
}
