import {CommonModule} from '@angular/common';
import {NgModule} from "@angular/core";
import {DropdownDirective} from "./directive/dropdown.directive";
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";
import {DropdownSidebarDirective} from "./directive/dropdown-sidebar.directive";
import {DegIconDirective} from "./directive/deg-icon.directive";

@NgModule({
  declarations: [
    DropdownDirective,
    DropdownSidebarDirective,
    LoadingSpinnerComponent,
    DegIconDirective
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    DropdownDirective,
    DropdownSidebarDirective,
    LoadingSpinnerComponent,
    DegIconDirective
  ],
})
export class SharedModule {
}
