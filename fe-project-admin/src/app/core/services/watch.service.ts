import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, Subject, tap} from "rxjs";

@Injectable()
export class WatchService {
  private apiUrl = 'http://127.0.0.1:8000/api/product';

  private apiSearch = 'http://127.0.0.1:8000/api/search';

  private apiDeleteManyWatches = 'http://127.0.0.1:8000/api/product-ids'
  private searchSubject = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  getWatches(pageNo: number, pageSize: number, keyword: string): Observable<any> {
    const url = `${this.apiSearch}?page=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`;
    return this.http.get(url);
  }

  deleteWatch(watchId: string) {
    const url = `${this.apiUrl}/${watchId}`;
    return this.http.delete(url);
  }

  deleteWatches(watchIds: string[]) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${this.apiDeleteManyWatches}`
    const option = {headers, body: {'ids': watchIds}}
    return this.http.delete<any>(url, option);
  }

  // search(pageNo: number, pageSize: number, keyword: string): Observable<any> {
  //   const url = `${this.apiSearch}?page=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`
  //   return this.http.get(url);
  // }

  get searchObservable(): Observable<string> {
    return this.searchSubject.asObservable();
  }

  updateSearchQuery(query: string): void {
    this.searchSubject.next(query);
  }

  addWatch(name: any, CCHD: any, type: any, brand: any, size: any, shape: any, material: any, strap: any, price: any, image: any, description: any) {
    return this.http
      .post(
        this.apiUrl,
        {
          tenSanPham: name,
          maCCHD: CCHD,
          maLoai: type,
          maThuongHieu: brand,
          maKichThuoc: size,
          maHinhDang: shape,
          maChatlieu: material,
          maDayDeo: strap,
          giaSanPham: price,
          anhSP: image,
          moTaSP: description
        }
      )
      .pipe(

      )
  }
}
