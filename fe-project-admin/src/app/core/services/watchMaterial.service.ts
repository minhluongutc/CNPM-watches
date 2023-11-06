import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WatchMaterialService {
  private apiUrl = 'http://127.0.0.1:8000/api/material';

  constructor(private http: HttpClient) {
  }

  getMaterial() {
    return this.http.get(this.apiUrl);
  }
}
