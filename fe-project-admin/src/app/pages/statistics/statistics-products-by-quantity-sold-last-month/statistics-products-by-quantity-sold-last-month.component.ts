import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {StatisticsService} from "../../../core/services/statistics.service";

@Component({
  selector: 'app-statistics-products-by-quantity-sold-last-month',
  templateUrl: './statistics-products-by-quantity-sold-last-month.component.html',
  styleUrls: ['./statistics-products-by-quantity-sold-last-month.component.css']
})
export class StatisticsProductsByQuantitySoldLastMonthComponent implements OnInit {
  dataResponse: any;
  productSoleds: ProductSoled[] = [];
  displayedColumns: string[] = ['position', 'maSanPham', 'productName', 'quantitySold', 'totalRevenue'];
  dataSource = new MatTableDataSource<ProductSoled>(this.productSoleds);
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  resultsLength = 0;

  constructor(private statisticsSV: StatisticsService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.statisticsSV
      .loadStatisticsByProductSoled()
      .subscribe(res => {
        this.dataResponse = res;
        console.log(res)
        this.productSoleds = this.dataResponse.productsByQuantitySold;
        console.log(this.productSoleds)
        this.dataSource = new MatTableDataSource<ProductSoled>(this.productSoleds);
        this.dataSource.paginator = this.paginator;
      })
  }

}

export interface ProductSoled {
  maSanPham: string;
  productName: number;
  quantitySold: number;
  totalRevenue: string;
}
