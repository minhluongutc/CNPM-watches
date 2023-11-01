import {NgModule} from "@angular/core";
import {DataStorageService} from "./services/data-storage.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {WatchService} from "./services/watch.service";

@NgModule({
  providers: [
    DataStorageService,
    WatchService
  ],
  imports: [HttpClientModule]
})
export class CoreModule {
}
