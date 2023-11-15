import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup = new FormGroup<any>({});
  isLoading = false;

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {
  }

  ngOnInit(): void {
    this.forgotForm = new FormGroup(
      {
        'email': new FormControl('', [Validators.required, Validators.email])
      }
    )
  }

  onSubmit(form: FormGroup) {
    this.isLoading = true;
    console.log(this.forgotForm);
    const email = form.value.email;
    this.authService
      .forgotPassword(email)
      .subscribe(
        res => {
          console.log(res);
          this.isLoading = false;
          // this.router.navigate(['/login']);
          this.showSuccess('Lấy lại mật khẩu thành công.')
        },
        error => {
          this.showError(error);
          this.isLoading = false;
        }
      )
  }

  get email() {
    return this.forgotForm.get('email');
  }


  showSuccess(message: string) {
    this.messageService.add({severity: 'success', summary: 'Thành công', detail: message});
  }

  showError(message: string) {
    this.messageService.add({severity: 'error', summary: 'Thất bại', detail: message});
  }


}
