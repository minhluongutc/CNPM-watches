import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WatchBrandService {
  private apiUrl = 'http://127.0.0.1:8000/api/brand';

  constructor(private http: HttpClient) {
  }

  getBrands() {
    return this.http.get(this.apiUrl);
  }
}
