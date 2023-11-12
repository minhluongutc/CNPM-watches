import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  dataResponse: any;
  showUpdatePopup = false;
  isLoadingForm = false;
  editForm: FormGroup = new FormGroup<any>({});
  gioiTinhSelected: string = '';

  constructor(private authService: AuthService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getProfile();

    this.editForm = new FormGroup(
      {
        'address': new FormControl('', [Validators.required]),
        'gender': new FormControl('', [Validators.required]),
        'phoneNumber': new FormControl('', [Validators.required, Validators.pattern('^(0|\\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8-9]|9\\d)\\d{7}$')])
      }
    )
  }

  get phoneNumber() {
    return this.editForm.get('phoneNumber');
  }

  get address() {
    return this.editForm.get('address');
  }

  get gender() {
    return this.editForm.get('gender');
  }

  getProfile() {
    this.authService
      .profile()
      .subscribe(res => {
        console.log(res);
        this.dataResponse = res;
      })
  }

  hideUpdateFormFn() {
    this.showUpdatePopup = false;
  }

  showUpdatePopupFn() {
    this.editForm.controls['address'].setValue(this.dataResponse.diaChi)
    // this.editForm.controls['gender'].setValue(this.dataResponse.gioiTinh)
    this.editForm.controls['phoneNumber'].setValue(this.dataResponse.SDT)
    this.gioiTinhSelected = this.dataResponse.gioiTinh;
    this.showUpdatePopup = true;
  }

  onEdit(editForm: FormGroup) {
    const id = this.dataResponse.maKhachHang;
    const phoneNumber = editForm.value.phoneNumber;
    const gender = editForm.value.gender;
    const address = editForm.value.address;
    this.authService
      .updateProfile(id, gender, address, phoneNumber)
      .subscribe(res => {
        console.log(res);
        this.showUpdatePopup = false;
        this.showSuccess('Cập nhật thông tin thành công.');
      }, error => {
        this.showError();
      })
  }

  showSuccess(message: string) {
    this.messageService.add({severity: 'success', summary: 'Thành công', detail: message});
  }

  showError() {
    this.messageService.add({severity: 'error', summary: 'Thất bại', detail: 'Lỗi hệ thống.'});
  }
}
