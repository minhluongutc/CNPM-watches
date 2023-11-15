import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Watch} from "../../models/watch.model";

@Injectable()
export class WishlistService {
  private getListApi = 'http://localhost:8000/api/wishlist';
  showWishlistItem = false;
  wishlistData: Watch[] = [];

  constructor(private http: HttpClient) {
  }

  getList() {
    return this.http.get(`${this.getListApi}`);
  }

  getWatchById(id: string | number) {
    return this.http.get(`http://localhost:8000/api/product/${id}`)
  }

  addToWishlist(id: string | number) {
    return this.http.post(`${this.getListApi}/add/${id}`, {});
  }

  removeToWishlist(id: string | number) {
    return this.http.delete(`${this.getListApi}/remove/${id}`, {});
  }

  setWishlistData(watches: Watch[]) {
    this.wishlistData = watches;
  }

  getWishlistData() {
    return this.wishlistData;
  }

  onShow() {
    this.showWishlistItem = true;
  }

  onClose() {
    this.showWishlistItem = false;
  }
}
