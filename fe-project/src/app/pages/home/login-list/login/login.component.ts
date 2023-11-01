import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../login-list.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup<any>({});

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

  onSubmit() {
    console.log(this.loginForm);
  }


}
