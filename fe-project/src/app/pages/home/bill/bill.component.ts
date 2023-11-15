import {Component, OnInit} from '@angular/core';
import {CheckoutService} from "../../../core/services/checkout.service";
import {ActivatedRoute} from "@angular/router";
import {Bill} from "../../../models/Bill.model";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import {CartService} from "../../../core/services/cart.service";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  responseData: any;
  bills: Bill[] = [];
  ngayBan: string = '';
  maHoaDon: string = ''
  tongTien: number = 0;

  constructor(private checkoutSV: CheckoutService, private route: ActivatedRoute, private cartSV: CartService) {
  }

  ngOnInit(): void {

    this.cartSV.setTotalPrice(0);
    this.route.queryParams.subscribe(params => {
      console.log(params);
      const vnp_Amount: string | number | boolean = params['vnp_Amount']
      const vnp_BankCode: string | number | boolean = params['vnp_BankCode']
      const vnp_BankTranNo: string | number | boolean = params['vnp_BankTranNo']
      const vnp_CardType: string | number | boolean = params['vnp_CardType']
      const vnp_OrderInfo: string | number | boolean = params['vnp_OrderInfo']
      const vnp_PayDate: string | number | boolean = params['vnp_PayDate']
      const vnp_ResponseCode: string | number | boolean = params['vnp_ResponseCode']
      const vnp_TmnCode: string | number | boolean = params['vnp_TmnCode']
      const vnp_TransactionNo: string | number | boolean = params['vnp_TransactionNo']
      const vnp_TransactionStatus: string | number | boolean = params['vnp_TransactionStatus']
      const vnp_TxnRef: string | number | boolean = params['vnp_TxnRef']
      const vnp_SecureHash: string | number | boolean = params['vnp_SecureHash']

      this.getBill(
        vnp_Amount,
        vnp_BankCode,
        vnp_BankTranNo,
        vnp_CardType,
        vnp_OrderInfo,
        vnp_PayDate,
        vnp_ResponseCode,
        vnp_TmnCode,
        vnp_TransactionNo,
        vnp_TransactionStatus,
        vnp_TxnRef,
        vnp_SecureHash
      )
    })
  }

  getBill(
    vnp_Amount: string | number | boolean,
    vnp_BankCode: string | number | boolean,
    vnp_BankTranNo: string | number | boolean,
    vnp_CardType: string | number | boolean,
    vnp_OrderInfo: string | number | boolean,
    vnp_PayDate: string | number | boolean,
    vnp_ResponseCode: string | number | boolean,
    vnp_TmnCode: string | number | boolean,
    vnp_TransactionNo: string | number | boolean,
    vnp_TransactionStatus: string | number | boolean,
    vnp_TxnRef: string | number | boolean,
    vnp_SecureHash: string | number | boolean
  ) {
    this.checkoutSV.returnBill(
      vnp_Amount,
      vnp_BankCode,
      vnp_BankTranNo,
      vnp_CardType,
      vnp_OrderInfo,
      vnp_PayDate,
      vnp_ResponseCode,
      vnp_TmnCode,
      vnp_TransactionNo,
      vnp_TransactionStatus,
      vnp_TxnRef,
      vnp_SecureHash
    ).subscribe(res => {
      console.log(res);
      this.responseData = res;
      this.bills = this.responseData;
      this.ngayBan = this.responseData[0].ngayLapHD;
      this.maHoaDon = this.responseData[0].maHDB;
      this.tongTien = this.responseData[0].tongTienHDB;
    })
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
