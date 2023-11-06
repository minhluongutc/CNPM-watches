import {Component} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {Observable} from "rxjs";
import {AuthResponseData} from "../../models/AuthResponseData.model";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginForm: FormGroup = new FormGroup<any>({});
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        'username': new FormControl('', [Validators.required]),
        'password': new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    )
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(form: FormGroup) {
    this.isLoading = true;
    const username = form.value.username;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.login(username, password);
    authObs.subscribe(
      (resData: AuthResponseData) => {
        this.isLoading = false;
        console.log(resData);
        this.router.navigate(['']);
      },
      errorMessage => {
        this.isLoading = false;
        console.log(errorMessage);
        this.showError(errorMessage)
      });
  }

  showError(message: string) {
    this.messageService.add({severity: 'error', summary: 'Thất bại', detail: message});
  }
}
