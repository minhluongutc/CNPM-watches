import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../../core/services/shopping-cart.service";
import {Watch} from "../../../models/watch.model";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css', '../header/header-main/cart-item-mini/cart-item-mini.component.css']
})
export class ShoppingCartComponent implements OnInit {
  watchesInCart: Watch[] = [];
  total: number = 0;
  numberOfItem: number = 0;

  constructor(private shoppingCartSV: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.watchesInCart = this.shoppingCartSV.getWatchesInCart();
    this.shoppingCartSV.showCartItem = false;
    this.total = this.shoppingCartSV.getTotalPrice()
    this.numberOfItem = this.shoppingCartSV.getTotalWatches()
  }
}
