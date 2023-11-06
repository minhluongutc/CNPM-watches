import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WatchStrapService {
  private apiUrl = 'http://127.0.0.1:8000/api/strap';

  constructor(private http: HttpClient) {
  }

  getStraps() {
    return this.http.get(this.apiUrl);
  }
}
