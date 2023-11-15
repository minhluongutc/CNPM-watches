import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WishlistService} from "../../../../../core/services/wishlist.service";
import {MessageService} from "primeng/api";
import {WatchService} from "../../../../../core/services/watch.service";
import {Watch} from "../../../../../models/watch.model";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>();
  @Input() isAuthenticated = false;
  dataResponse: any;
  watchesInCart: Watch[] = [];
  watchInCart: Watch = new Watch("", "", 0, 0, "", "", "", "", "", "", "", "", "", 0, "", "", "", "", "", 0)
  dataResponseSub: any;

  constructor(private wishListSV: WishlistService, private messageService: MessageService, public watchService: WatchService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.wishListSV.getList().subscribe(res => {
      console.log(res)
      this.dataResponse = res;
      for (let watch of this.dataResponse.wishlist) {
        this.getWatchById(watch.maSanPham);
      }
    })
    this.wishListSV.setWishlistData(this.watchesInCart);
  }

  getWatchById(id: string | number) {
    this.watchesInCart = [];
    this.wishListSV.getWatchById(id)
      .subscribe(res => {
        console.log(res);
        this.dataResponseSub = res;
        this.watchInCart = this.dataResponseSub.product;
        this.watchesInCart.push(this.watchInCart)
      })
  }

  onCloseWishlist(status: boolean) {
    this.onClose.emit(false);
  }

  onRemoveToWishlist(id: string | number) {
    this.wishListSV.removeToWishlist(id).subscribe(res => {
      console.log(res)
      this.showSuccess('Xóa sản phẩm khỏi danh sách yêu thích thành công.');
    })
    this.loadData();
  }

  onAddToWishlist() {

  }


  showError(message: string) {
    return this.messageService.add({severity: 'error', summary: 'Thất bại', detail: message});
  }

  showSuccess(message: string) {
    return this.messageService.add({severity: 'success', summary: 'Thành công', detail: message});
  }
}
