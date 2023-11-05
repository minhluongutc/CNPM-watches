import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";

@Injectable()
export class DataStorageService {
  private apiUrl = 'http://127.0.0.1:8000/api/product/'

  // private apiDeleteWatch = 'http://127.0.0.1:8000/api/product/'

  constructor(private http: HttpClient) {
  }

  getWatches(pageNo: number, pageSize: number): Observable<any> {
    const url = `${this.apiUrl}?page=${pageNo}&pageSize=${pageSize}`;
    return this.http.get(url);
  }

  deleteWatch(watchId: string) {
    const url = `${this.apiUrl}${watchId}`;
    return this.http.delete(url);
  }
}
