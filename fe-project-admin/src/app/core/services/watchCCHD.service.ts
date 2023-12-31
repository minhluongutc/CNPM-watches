import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WatchCCHDService {
  private apiUrl = 'http://127.0.0.1:8000/api/cchd';

  constructor(private http: HttpClient) {
  }

  getCCHD() {
    return this.http.get(this.apiUrl);
  }
}
