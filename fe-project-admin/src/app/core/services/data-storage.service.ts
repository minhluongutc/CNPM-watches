import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Watch} from "../../models/watch.model";
import {map, Observable, tap} from "rxjs";
import {WatchService} from "./watch.service";

@Injectable()
export class DataStorageService {
  private apiGetWatches = 'http://127.0.0.1:8000/api/product'

  constructor(private http: HttpClient) {
  }

  getWatches(pageNo: number, pageSize: number): Observable<any> {
    const url = `${this.apiGetWatches}?page=${pageNo}&pageSize=${pageSize}`;
    return this.http.get(url);
  }
}
