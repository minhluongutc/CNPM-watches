import {Component, Input, OnInit} from '@angular/core';
import {Watch} from "../../../../../models/watch.model";
import {WatchService} from "../../../../../core/services/watch.service";
import {CartService} from "../../../../../core/services/cart.service";
import {MessageService} from "primeng/api";
import {WishlistService} from "../../../../../core/services/wishlist.service";

@Component({
  selector: 'app-watch-item',
  templateUrl: './watch-item.component.html',
  styleUrls: ['./watch-item.component.css']
})
export class WatchItemComponent implements OnInit {
  @Input() watch: Watch = new Watch("", "", 0, 0, "", "", "", "", "", "", "", "", "", 0, "", "", "", "", "", 0);
  image: any;
  isLove = false;

  constructor(
    private watchService: WatchService,
    private cartSV: CartService,
    private messageService: MessageService,
    private wishlistSV: WishlistService
  ) {
  }

  ngOnInit() {
    this.image = this.watchService.getImage(this.watch.maSanPham)
    console.log(this.watch)
    this.checkLove();
  }

  checkLove() {
    console.log(this.wishlistSV.getWishlistData())
    for (let watch of this.wishlistSV.getWishlistData()) {
      if (this.watch.maSanPham == watch.maSanPham) {
        this.isLove = true;
      }
    }
  }

  onAddToCart(id: string | number) {
    this.cartSV
      .addToCart(id)
      .subscribe((res) => {
          console.log(res)
          this.showSuccess('Thêm thành công sản phẩm vào giỏ hàng.');
        },
        error => {
          console.log(error);
          this.showError('Thêm sản phẩm không thành công, vui lòng đăng nhập.');
        })
  }

  onAddToWishlist(id: string | number) {
    this.wishlistSV
      .addToWishlist(id)
      .subscribe(res => {
          console.log(res);
          this.showSuccess('Thêm thành công sản phẩm vào danh sách yêu thích.');
        },
        error => {
          console.log(error);
          this.showError('Thêm sản phẩm không thành công, vui lòng đăng nhập.');
        })
  }

  showError(message: string) {
    return this.messageService.add({severity: 'error', summary: 'Thất bại', detail: message});
  }

  showSuccess(message: string) {
    return this.messageService.add({severity: 'success', summary: 'Thành công', detail: message});
  }
}
