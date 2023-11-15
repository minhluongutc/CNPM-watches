import {Injectable} from "@angular/core";
import {Watch} from "../../models/watch.model";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CartService {
  private shoppingCartData: any;

  private apiUrl = 'http://localhost:8000/api/cart';
  private apiGetWatchById = 'http://localhost:8000/api/product';
  totalPrice: number = 0;

  constructor(private http: HttpClient) {
  }

  showCartItem: boolean = false;

  getWatchIdsInCart() {
    return this.http.get(this.apiUrl);
  }

  getWatchById(id: string | number) {
    return this.http.get(`${this.apiGetWatchById}/${id}`)
  }

  getBillSales(page: number, pageSize: number) {
    return this.http.get(`http://127.0.0.1:8000/api/showHdb?page=${page}&pageSize=${pageSize}`);
  }

  getShoppingCartData(): any {
    return this.shoppingCartData;
  }

  setShoppingCartData(data: any): void {
    this.shoppingCartData = data;
  }

  addToCart(id: string | number) {
    return this.http.post(`${this.apiUrl}?maSanPham=${id}`, {});
  }

  removeToCart(id: string | number) {
    return this.http.delete(`${this.apiUrl}/${id}`, {});
  }

  setTotalPrice(totalPrice: number) {
    this.totalPrice = totalPrice;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  onShow() {
    this.showCartItem = true;
  }

  onClose() {
    this.showCartItem = false;
  }
}
