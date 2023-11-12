import {Component, OnInit} from '@angular/core';
import {CartService} from "./core/services/cart.service";
import {AuthService} from "./core/services/auth.service";
import {Watch} from "./models/watch.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  watchesInCart: Watch[] = [];
  isShowCart: boolean = false;
  dataResponse: any;
  dataResponseSub: any;
  watchInCart: Watch = new Watch("", "", 0, 0, "", "", "", "", "", "", "", "", "", 0, "", "", "", "", "")

  constructor(private cartSV: CartService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.isShowCart = this.cartSV.showCartItem;
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
        this.dataResponseSub = res;
        this.watchInCart = this.dataResponseSub.product;
        this.watchesInCart.push(this.watchInCart)
      })
  }
}

