import {NgModule} from "@angular/core";
import {WatchService} from "./services/watch.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {AuthService} from "./services/auth.service";
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {WatchSizeService} from "./services/watchSize.service";
import {WatchBrandService} from "./services/watchBrand.service";
import {WatchCCHDService} from "./services/watchCCHD.service";
import {WatchMaterialService} from "./services/watchMaterial.service";
import {WatchShapeService} from "./services/watchShape.service";
import {WatchStrapService} from "./services/watchStrap.service";
import {WatchTypeService} from "./services/watchType.service";

@NgModule({
  providers: [
    WatchService,
    WatchService,
    MessageService,
    AuthGuardService,
    AuthService,
    WatchSizeService,
    WatchBrandService,
    WatchCCHDService,
    WatchMaterialService,
    WatchShapeService,
    WatchStrapService,
    WatchTypeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  imports: [HttpClientModule]
})
export class CoreModule {
}
