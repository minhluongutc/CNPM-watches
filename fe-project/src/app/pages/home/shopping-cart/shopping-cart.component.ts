import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../core/services/cart.service";
import {Watch} from "../../../models/watch.model";
import {MessageService} from "primeng/api";
import {WatchService} from "../../../core/services/watch.service";
import {CheckoutService} from "../../../core/services/checkout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css', '../header/header-main/cart-item-mini/cart-item-mini.component.css']
})
export class ShoppingCartComponent implements OnInit {
  watchesInCart: Watch[] = [];
  watchInCart: Watch = new Watch("", "", 0, 0, "", "", "", "", "", "", "", "", "", 0, "", "", "", "", "")
  dataResponse: any;
  dataResponseSub: any;
  urlPayment: any;

  constructor(
    private cartSV: CartService,
    private messageService: MessageService,
    public watchService: WatchService,
    private checkoutSV: CheckoutService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.cartSV.showCartItem = false;
    this.getCartDetail();
  }

  getCartDetail() {
    this.cartSV
      .getWatchIdsInCart()
      .subscribe(
        (res) => {
          this.dataResponse = res;
          console.log(this.dataResponse[0].cart_detail);//chi tiet gio hang
          for (let watch of this.dataResponse[0].cart_detail) {
            this.getWatchesInCart(watch.maSanPham);
          }
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
    this.getCartDetail();
  }

  onRemoveToCart(id: number | string) {
    this.cartSV
      .removeToCart(id)
      .subscribe((res) => {
        console.log(res)
        this.showSuccess('Xóa sản phẩm khỏi giỏ hàng thành công.')
      })
    this.getCartDetail();
  }

  onCheckout() {
    this.checkoutSV.getPayment().subscribe(
      res => {
        console.log(res)
        this.urlPayment = res;
        console.log(this.urlPayment)
        if (this.urlPayment.data) {
          // Chuyển hướng đến URL mới
          window.location.href = this.urlPayment.data;
        }
      }, error => {
        console.log(error)
      }
    )
  }

  showError(message: string) {
    return this.messageService.add({severity: 'error', summary: 'Thất bại', detail: message});
  }

  showSuccess(message: string) {
    return this.messageService.add({severity: 'success', summary: 'Thành công', detail: message});
  }


}
