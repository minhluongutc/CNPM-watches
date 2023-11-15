import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Watch} from "../../models/watch.model";

@Injectable()
export class WatchService {
  private apiUrl = 'http://127.0.0.1:8000/api/search';
  private apiFilter = 'http://127.0.0.1:8000/api/filter'
  private searchSubject = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  updateSearchQuery(query: string): void {
    this.searchSubject.next(query);
  }

  get searchObservable(): Observable<string> {
    return this.searchSubject.asObservable();
  }

  filter(gioiTinh: string, chatLieu: string, hinhDang: string, CCHD: string, dayDeo: string, kichThuoc: string, orderBy: string) {
    return this.http.get(`${this.apiFilter}?gioiTinh=${gioiTinh}&chatLieu=${chatLieu}&hinhDang=${hinhDang}&CCHD=${CCHD}&dayDeo=${dayDeo}&kichThuoc=${kichThuoc}&orderBy=${orderBy}`)
  }

  getWatches(pageNo: number, pageSize: number, keyword: string): Observable<any> {
    const url = `${this.apiUrl}?page=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`;
    return this.http.get(url);
  }

  getWatch(id: string): Observable<any> {
    // return <Watch>this.watches.find(i => i.id == id);
    const url = `http://127.0.0.1:8000/api/product/${id}`;
    return this.http.get(url);
  }

  getImage(id: string | number) {
    return `http://127.0.0.1:8000/api/products/${id}/image`;
    // return this.http.get(url);
  }

  getImageDetails(id: string | number) {
    const url = `http://127.0.0.1:8000/api/getImageDetail/${id}`;
    return this.http.get(url);
  }

  getImageDetail(imageName: string) {
    return `http://127.0.0.1:8000/api/image_detail/${imageName}`;
  }

}
