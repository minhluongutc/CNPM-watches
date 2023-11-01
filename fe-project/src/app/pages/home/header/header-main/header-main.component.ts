import {Component,} from "@angular/core";
import {ShoppingCartService} from "../../../../core/services/shopping-cart.service";

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent {
  showItemCart: boolean = false;

  constructor(private shoppingCartSV: ShoppingCartService) {
  }

  onShowCartItem() {
    this.shoppingCartSV.onShow();
    this.showItemCart = this.shoppingCartSV.showCartItem;
  }

  onCloseCartItem(status: boolean) {
    this.shoppingCartSV.onClose();
    this.showItemCart = this.shoppingCartSV.showCartItem;
  }
}
