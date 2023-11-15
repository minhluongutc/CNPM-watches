import {Component, OnInit} from '@angular/core';
import {BillOfSaleService} from "../../core/services/bill-of-sale.service";
import {Bill} from "../../models/Bill.model";
import {MatTableDataSource} from "@angular/material/table";
import {Watch} from "../../models/watch.model";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-bill-of-sale',
  templateUrl: './bill-of-sale.component.html',
  styleUrls: ['./bill-of-sale.component.css']
})
export class BillOfSaleComponent implements OnInit {
  dataResponse: any;
  pageSelected = 1;
  pageSizeSelected = 5;
  bills: Bill[] = [];
  displayedColumns: string[] = ['maHDB', 'tenKhachHang', 'diaChi', 'SDT', 'email', 'ngayLapHD', 'tongTienHDB']
  dataSource = new MatTableDataSource<Bill>(this.bills);
  selection = new SelectionModel<Bill>(true, []);
  isLoading: boolean = false;

  constructor(private bosSV: BillOfSaleService) {
  }

  ngOnInit() {
    this.getBills();
  }

  getBills() {
    this.isLoading = true;
    this.bosSV.getAllBill(this.pageSelected, this.pageSizeSelected)
      .subscribe(res => {
        this.dataResponse = res
        console.log(res);
        this.bills = this.dataResponse.showhd;
        console.log(this.bills);
        this.dataSource = new MatTableDataSource<Bill>(this.bills);
        this.isLoading = false;
      })
  }


  onChangedPageSize(value: string) {
    this.pageSizeSelected = Number(value);
    this.isLoading = true;
    this.getBills();
  }

}
