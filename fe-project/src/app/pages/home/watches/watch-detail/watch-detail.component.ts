import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {WatchService} from "../../../../core/services/watch.service";
import {Watch} from "../../../../models/watch.model";
import {CartService} from "../../../../core/services/cart.service";
import {MessageService} from "primeng/api";
import {WishlistService} from "../../../../core/services/wishlist.service";

@Component({
  selector: 'app-watch-detail',
  templateUrl: './watch-detail.component.html',
  styleUrls: ['./watch-detail.component.css']
})
export class WatchDetailComponent implements OnInit {
  watch: Watch = new Watch("", "", 0, 0, "", "", "", "", "", "", "", "", "", 0, "", "", "", "", "", 0);
  id: string = '';
  imageDetails: any;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public watchService: WatchService,
    private cartSV: CartService,
    private messageService: MessageService,
    private wishlistSV: WishlistService
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getWatch(this.id);
      console.log(this.watch)

      this.isLoading = false;
    });
    console.log(this.watch);
  }

  getWatch(id: string) {
    this.isLoading = true;
    this.watchService
      .getWatch(id)
      .subscribe(
        (response) => {
          this.watch = response.product;
          this.getImageDetail(this.watch.maSanPham);
          console.log(this.watch)
        }
      )
  }

  getImageDetail(id: string | number) {
    this.watchService
      .getImageDetails(id)
      .subscribe(data => {
        this.imageDetails = data;
        console.log(data);
      })
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


  protected readonly Watch = Watch;
}
