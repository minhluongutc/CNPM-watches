import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from "./core/core.module";
import {HomeModule} from "./pages/home/home.module";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ForgotPasswordComponent} from './pages/home/forgot-password/forgot-password.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [AppComponent, ForgotPasswordComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    CoreModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
