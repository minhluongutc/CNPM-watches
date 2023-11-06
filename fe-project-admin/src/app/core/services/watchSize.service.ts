import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WatchSizeService {
  private apiUrl = 'http://127.0.0.1:8000/api/size';

  constructor(private http: HttpClient) {
  }

  getSizes() {
    return this.http.get(this.apiUrl);
  }
}
