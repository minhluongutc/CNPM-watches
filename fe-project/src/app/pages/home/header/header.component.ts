import {Component, OnInit} from '@angular/core';
import {CartItemMiniComponent} from "./header-main/cart-item-mini/cart-item-mini.component";
import {CartService} from "../../../core/services/cart.service";
import {Watch} from "../../../models/watch.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
}
