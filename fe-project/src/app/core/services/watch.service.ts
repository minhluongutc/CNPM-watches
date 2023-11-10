import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Watch} from "../../models/watch.model";

@Injectable()
export class WatchService {
  private apiUrl = 'http://127.0.0.1:8000/api/product';
  private searchSubject = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  getWatches(pageNo: number, pageSize: number, keyword: string): Observable<any> {
    const url = `${this.apiUrl}?page=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`;
    return this.http.get(url);
  }

  getWatch(id: string): Observable<any> {
    // return <Watch>this.watches.find(i => i.id == id);
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  getImage(id: string | number) {
    return `http://127.0.0.1:8000/api/products/${id}/image`;
    // return this.http.get(url);
  }

  getImageDetails(id: string | number) {
    const url = `http://127.0.0.1:8000/api/products_detail/${id}/image`;
    return this.http.get(url);
  }

  getImageDetail(imageName: string) {
    return `http://127.0.0.1:8000/api/image_detail/${imageName}`;
  }

}
