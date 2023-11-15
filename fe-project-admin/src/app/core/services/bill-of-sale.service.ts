import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class BillOfSaleService {
  private api = 'http://127.0.0.1:8000/api/showHdb';

  constructor(private http: HttpClient) {
  }

  getAllBill(page: number, pageSize: number) {
    return this.http.get(`${this.api}?page=${page}&pageSize=${pageSize}`);
  }
}
