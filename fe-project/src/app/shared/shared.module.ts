import {NgModule} from '@angular/core';
import {ScrollDirective} from './layout/directives/scroll.directive';
import {NgIf, UpperCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [ScrollDirective, PageNotFoundComponent],
  imports: [
    UpperCasePipe,
    RouterLink,
    NgIf
  ],
  exports: [ScrollDirective],
})
export class SharedModule {
}
