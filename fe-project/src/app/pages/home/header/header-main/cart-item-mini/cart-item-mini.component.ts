import {Component, EventEmitter, Injectable, Input, OnInit, Output} from "@angular/core";
import {CartService} from "../../../../../core/services/cart.service";
import {Watch} from "../../../../../models/watch.model";
import {MessageService} from "primeng/api";
import {WatchService} from "../../../../../core/services/watch.service";

@Injectable()
@Component({
  selector: 'app-cart-item-mini',
  templateUrl: './cart-item-mini.component.html',
  styleUrls: ['./cart-item-mini.component.css']
})
export class CartItemMiniComponent implements OnInit {
  watchesInCart: Watch[] = [];
  dataResponse: any;
  @Output() onClose = new EventEmitter<boolean>();
  @Input() isAuthenticated = false;
  watchInCart: Watch = new Watch("", "", 0, 0, "", "", "", "", "", "", "", "", "", 0, "", "", "", "", "", 0)
  dataResponseSub: any;

  constructor(public cartSV: CartService, private messageService: MessageService, public watchService: WatchService) {
  }

  ngOnInit(): void {
    this.watchesInCart = [];
    this.cartSV.showCartItem = false;
    this.getCartDetail();
  }

  getCartDetail() {
    this.cartSV
      .getWatchIdsInCart()
      .subscribe(
        (res) => {
          console.log(res)
          this.dataResponse = res;

          this.cartSV.setTotalPrice(this.dataResponse[0].tongTienGH)
          console.log(this.dataResponse[0].cart_detail);//chi tiet gio hang
          for (let watch of this.dataResponse[0].cart_detail) {
            this.getWatchesInCart(watch.maSanPham);
          }
          this.cartSV.setShoppingCartData(this.watchesInCart);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  getWatchesInCart(id: string | number) {
    this.watchesInCart = [];
    this.cartSV
      .getWatchById(id)
      .subscribe((res) => {
        console.log(res)
        this.dataResponseSub = res;
        this.watchInCart = this.dataResponseSub.product;
        this.watchesInCart.push(this.watchInCart)
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
          this.showError('Thêm sản phẩm không thành công.' + error);
        })
    // this.getCartDetail();
  }

  onRemoveToCart(id: number | string) {
    this.cartSV
      .removeToCart(id)
      .subscribe((res) => {
        console.log(res)
        this.showSuccess('Xóa sản phẩm khỏi giỏ hàng thành công.');
      })
    this.ngOnInit()
  }

  showError(message: string) {
    return this.messageService.add({severity: 'error', summary: 'Thất bại', detail: message});
  }

  showSuccess(message: string) {
    return this.messageService.add({severity: 'success', summary: 'Thành công', detail: message});
  }


  onCloseCart(status: boolean) {
    this.onClose.emit(false);
  }
}
