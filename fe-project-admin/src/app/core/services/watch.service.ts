import {Injectable} from "@angular/core";
import {Watch} from "../../models/watch.model";
import {DataStorageService} from "./data-storage.service";

@Injectable()
export class WatchService {
  private watches: Watch[] = [];

  constructor(private dataStorage: DataStorageService) {
  }

  setWatches(watches: Watch[]) {
    this.watches = watches;
  }

  getResponse() {

  }

  // getWatches(page: number) {
  //   return this.dataStorage.getWatches(page).subscribe((response) => {
  //     this.watches = response.data;
  //   });
  // }
}
