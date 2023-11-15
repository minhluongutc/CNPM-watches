import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {PasswordValidator} from "../../../shared/validators/password-validator";
import {CartService} from "../../../core/services/cart.service";
import {MatTableDataSource} from "@angular/material/table";
import {jsPDF} from "jspdf";
import html2canvas from 'html2canvas';

export interface HDB {
  maHDB: string,
  maKhachHang: string,
  tenKhachHang: string,
  diaChi: string,
  SDT: string,
  email: string,
  ngayLapHD: string,
  giamGia: string,
  tongTienHDB: number,
  details: any;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  dataResponse: any;
  dataResponse2: any;
  showUpdatePopup = false;
  isLoadingForm = false;
  editForm: FormGroup = new FormGroup<any>({});
  showRepasswordForm = false;
  repasswordForm: FormGroup = new FormGroup<any>({});
  gioiTinhSelected: string = '';
  bills: HDB[] = [];
  displayedColumns: string[] = ['position', 'maHDB', 'ngayLapHD', 'tongTienHDB']
  dataSource = new MatTableDataSource<HDB>(this.bills);
  isLoading = false;
  showBill = false;
  bill: any;

  constructor(private authService: AuthService, private messageService: MessageService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.getProfile();
    this.getBills();
    this.editForm = new FormGroup({
      'address': new FormControl('', [Validators.required]),
      'gender': new FormControl('', [Validators.required]),
      'phoneNumber': new FormControl('', [Validators.required, Validators.pattern('^(0|\\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8-9]|9\\d)\\d{7}$')])
    })
    this.repasswordForm = new FormGroup({
      'oldPassword': new FormControl('', [Validators.required]),
      'newPassword': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmNewPassword': new FormControl('', [Validators.required, PasswordValidator('newPassword')])
    })
  }

  getBills() {
    this.isLoading = true;
    this.cartService
      .getBillSales(1, 10)
      .subscribe(res => {
        console.log(res);
        this.dataResponse2 = res;
        this.bills = this.dataResponse2;
        console.log(this.bills);
        this.dataSource = new MatTableDataSource<HDB>(this.bills);
        this.isLoading = false;
      })
  }

  get oldPassword() {
    return this.repasswordForm.get('oldPassword');
  }

  get newPassword() {
    return this.repasswordForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.repasswordForm.get('confirmNewPassword');
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

  showRepassword() {
    this.showRepasswordForm = true;
  }

  hideRepassword() {
    this.showRepasswordForm = false;
  }

  onEditProfile(editForm: FormGroup) {
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
        this.getProfile();
      }, error => {
        this.showError();
      })
  }

  onChangePassword(repasswordForm: FormGroup) {
    const id = this.dataResponse.maKhachHang;
    const oldPassword = repasswordForm.value.oldPassword
    const newPassword = repasswordForm.value.newPassword
    this.authService
      .changePassword(id, oldPassword, newPassword)
      .subscribe(res => {
        console.log(res);
        this.showRepasswordForm = false;
        this.showSuccess('Đổi mật khẩu thành công.')
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

  onRowClick(bill: any) {
    this.showBill = true;
    console.log(bill)
    this.bill = bill;
  }

  hideBill() {
    this.showBill = false;
  }

  exportToPDF() {
    const pdf = new jsPDF();

    const table = document.getElementById('bill');
    // @ts-ignore
    html2canvas(table).then((canvas) => {
      // Chuyển đổi ảnh thành dạng dữ liệu URL
      const imgData = canvas.toDataURL('image/png');

      // @ts-ignore
      pdf.addImage(imgData, 'PNG', 10, 10);

      pdf.save('hoa-don-mua.pdf');
    });
  }
}
