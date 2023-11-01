import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "./core/services/shopping-cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isShowCart: boolean = false;

  constructor(private shoppingCartSV: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.isShowCart = this.shoppingCartSV.showCartItem;
  }
}
