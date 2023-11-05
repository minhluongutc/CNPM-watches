import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Subscription} from "rxjs";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userSub: Subscription;
  isAuthenticated: boolean = false;
  userData: Partial<User> = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.userSub = Subscription.EMPTY;
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
      // this.isAuthenticated = !user ? false : true;
    });
    // @ts-ignore
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.userData)
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
