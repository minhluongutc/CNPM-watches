import {CommonModule} from '@angular/common';
import {NgModule} from "@angular/core";
import {DropdownDirective} from "./directive/dropdown.directive";

@NgModule({
  declarations: [
    DropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    DropdownDirective,
  ],
})
export class SharedModule {
}
