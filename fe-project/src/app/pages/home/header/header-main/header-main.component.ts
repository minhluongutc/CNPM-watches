import {Component, OnInit,} from "@angular/core";
import {CartService} from "../../../../core/services/cart.service";
import {AuthService} from "../../../../core/services/auth.service";
import {User} from "../../../../models/user.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {WishlistService} from "../../../../core/services/wishlist.service";

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent implements OnInit {
  showItemCart: boolean = false;
  showItemWishlist: boolean = false;
  userData: Partial<User> = {};
  isAuthenticated: boolean = false;
  userSub: Subscription;

  constructor(
    private authService: AuthService,
    private shoppingCartSV: CartService,
    private wishlistSV: WishlistService,
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

  onShowWishlist() {
    this.wishlistSV.onShow()
    this.showItemWishlist = this.wishlistSV.showWishlistItem;
  }

  onCloseWishlist(status: boolean) {
    this.wishlistSV.onClose();
    this.showItemWishlist = this.wishlistSV.showWishlistItem;
  }
}
