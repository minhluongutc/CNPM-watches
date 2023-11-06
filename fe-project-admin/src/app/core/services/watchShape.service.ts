import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WatchShapeService {
  private apiUrl = 'http://127.0.0.1:8000/api/shape';

  constructor(private http: HttpClient) {
  }

  getShape() {
    return this.http.get(this.apiUrl);
  }
}
