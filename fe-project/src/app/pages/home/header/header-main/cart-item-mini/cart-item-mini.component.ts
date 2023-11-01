import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ShoppingCartService} from "../../../../../core/services/shopping-cart.service";
import {Watch} from "../../../../../models/watch.model";

@Component({
  selector: 'app-cart-item-mini',
  templateUrl: './cart-item-mini.component.html',
  styleUrls: ['./cart-item-mini.component.css']
})
export class CartItemMiniComponent implements OnInit {
  watchesInCart: Watch[] = [];
  total: number = 0;
  numberOfItem = 0;
  @Output() onClose = new EventEmitter<boolean>();

  constructor(private shoppingCartSV: ShoppingCartService) {
  }

  ngOnInit() {
    this.watchesInCart = this.shoppingCartSV.getWatchesInCart();
    this.total = this.shoppingCartSV.getTotalPrice();
    this.numberOfItem = this.shoppingCartSV.getTotalWatches();
  }

  onCloseCart(status: boolean) {
    this.onClose.emit(false);
  }
}
