import {Component, OnInit,} from "@angular/core";
import {ShoppingCartService} from "../../../../core/services/shopping-cart.service";
import {AuthService} from "../../../../core/services/auth.service";
import {User} from "../../../../core/models/user.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent implements OnInit {
  showItemCart: boolean = false;
  userData: Partial<User> = {};
  isAuthenticated: boolean = false;
  userSub: Subscription;

  constructor(
    private authService: AuthService,
    private shoppingCartSV: ShoppingCartService,
    private router: Router
  ) {
    this.userSub = Subscription.EMPTY;
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    // @ts-ignore
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.userData)
    if (!this.isAuthenticated) {
      // this.router.navigate(['/login']);
    }
  }

  onShowCartItem() {
    this.shoppingCartSV.onShow();
    this.showItemCart = this.shoppingCartSV.showCartItem;
  }

  onCloseCartItem(status: boolean) {
    this.shoppingCartSV.onClose();
    this.showItemCart = this.shoppingCartSV.showCartItem;
  }

  onLogout() {
    this.authService.logout();
  }
}
