import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../login-list.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup<any>({});
  isLoading = false;

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    )
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(form: FormGroup) {
    this.isLoading = true;
    console.log(this.loginForm);
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password).subscribe(
      (res) => {
        console.log(res);

        this.isLoading = false;
        this.showSuccess('Đăng nhập thành công.');
        this.router.navigate(['/']);
      },
      (error) => {
        this.showError(error);
        this.isLoading = false;
      }
    );

  }

  showSuccess(message: string) {
    this.messageService.add({severity: 'success', summary: 'Thành công', detail: message});
  }

  showError(message: string) {
    this.messageService.add({severity: 'error', summary: 'Thất bại', detail: message});
  }


}
