import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class CheckoutService {
  private url = 'http://127.0.0.1:8000/api/vnpay_payment';
  private billUrl = 'http://127.0.0.1:8000/api/bill'

  constructor(private http: HttpClient) {
  }

  getPayment() {
    return this.http.get(`${this.url}`);
  }

  returnBill(
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
    // Tạo một đối tượng HttpParams để chứa các tham số
    let params = new HttpParams();

    // Thêm các tham số vào đối tượng HttpParams
    params = params.set('vnp_Amount', vnp_Amount);
    params = params.set('vnp_BankCode', vnp_BankCode);
    params = params.set('vnp_BankTranNo', vnp_BankTranNo);
    params = params.set('vnp_CardType', vnp_CardType);
    params = params.set('vnp_OrderInfo', vnp_OrderInfo);
    params = params.set('vnp_PayDate', vnp_PayDate);
    params = params.set('vnp_ResponseCode', vnp_ResponseCode);
    params = params.set('vnp_TmnCode', vnp_TmnCode);
    params = params.set('vnp_TransactionNo', vnp_TransactionNo);
    params = params.set('vnp_TransactionStatus', vnp_TransactionStatus);
    params = params.set('vnp_TxnRef', vnp_TxnRef);
    params = params.set('vnp_SecureHash', vnp_SecureHash);

    console.log(params)
    // Gửi HTTP GET request với các tham số đã thêm
    return this.http.get(`${this.billUrl}`, {params});
  }
}
