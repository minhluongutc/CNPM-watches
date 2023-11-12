import {Component, NgModule, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {EmailValidator} from "../../../../shared/validators/email-validator";
import {PasswordValidator} from "../../../../shared/validators/password-validator";
import {AuthService} from "../../../../core/services/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login-list.component.css']
})
export class RegisterComponent implements OnInit {
  // days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  // months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // years: number[] = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, 1959, 1958, 1957, 1956, 1955, 1954, 1953, 1952, 1951, 1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941, 1940, 1939, 1938, 1937, 1936, 1935, 1934, 1933, 1932, 1931, 1930, 1929, 1928, 1927, 1926, 1925, 1924];
  signupForm: FormGroup = new FormGroup<any>({})
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        'genderRegister': new FormControl('', [Validators.required]),
        'fullName': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÀ-Ỹà-ỹ ]+$')]),
        'address': new FormControl('', [Validators.required]),
        'phoneNumber': new FormControl('', [Validators.required, Validators.pattern('^(0|\\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8-9]|9\\d)\\d{7}$')]),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'confirmEmail': new FormControl('', [Validators.required, EmailValidator('email')]),
        'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
        'confirmPassword': new FormControl('', [Validators.required, PasswordValidator('password')])
      }
    )

    this.signupForm.setValue({
      'genderRegister': '',
      'fullName': '',
      'address': '',
      'phoneNumber': '',
      'email': '',
      'confirmEmail': '',
      'password': '',
      'confirmPassword': ''
    })
  }

  get phoneNumber() {
    return this.signupForm.get('phoneNumber');
  }

  get address() {
    return this.signupForm.get('address');
  }

  get fullName() {
    return this.signupForm.get('fullName');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get confirmEmail() {
    return this.signupForm.get('confirmEmail');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  onSubmit(form: FormGroup) {
    this.isLoading = true
    console.log(form)
    const fullName = form.value.fullName;
    const gender = form.value.genderRegister;
    const address = form.value.address;
    const phoneNumber = form.value.phoneNumber;
    const email = form.value.email;
    const password = form.value.password;
    this.authService
      .register(fullName, gender, address, phoneNumber, email, password)
      .subscribe(res => {
          console.log(res)
          this.showSuccess('Đăng ký tài khoản thành công.');
          this.isLoading = false;
        },
        (error) => {
          console.log(error)
          this.showError(error);
        })

    form.reset();
  }


  showSuccess(message: string) {
    this.messageService.add({severity: 'success', summary: 'Thành công', detail: message});
  }

  showError(message: string) {
    this.messageService.add({severity: 'error', summary: 'Thất bại', detail: message});
  }


  lastNameInput($event: any) {
    // $event['data'].trim()
  }
}
