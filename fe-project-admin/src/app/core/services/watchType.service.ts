import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WatchTypeService {
  private apiUrl = 'http://127.0.0.1:8000/api/type';

  constructor(private http: HttpClient) {
  }

  getType() {
    return this.http.get(this.apiUrl);
  }
}
