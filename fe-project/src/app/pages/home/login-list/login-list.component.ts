import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-list',
  templateUrl: './login-list.component.html',
  styleUrls: ['./login-list.component.css'],
})
export class LoginListComponent implements OnInit, OnDestroy {
  loginMode: boolean = true;

  constructor() {
  }

  ngOnInit() {
    // @ts-ignore
    this.loginMode = JSON.parse(localStorage.getItem('loginMode')) ?? true;
  }

  ngOnDestroy() {
    localStorage.removeItem('loginMode');
  }

  goToLogin() {
    this.loginMode = true;
    localStorage.setItem('loginMode', JSON.stringify(this.loginMode));
  }

  goToRegister() {
    this.loginMode = false;
    localStorage.setItem('loginMode', JSON.stringify(this.loginMode));
  }

}
