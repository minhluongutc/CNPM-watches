import {CommonModule} from '@angular/common';
import {NgModule} from "@angular/core";
import {DropdownDirective} from "./directive/dropdown.directive";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent
  ],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [
    CommonModule,
    DropdownDirective,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {
}
