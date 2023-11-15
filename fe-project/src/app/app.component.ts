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
  isShowCart: boolean = false;
  dataResponse: any;

  constructor(private cartSV: CartService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.isShowCart = this.cartSV.showCartItem;
  }


}

