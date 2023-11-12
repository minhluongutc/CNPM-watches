import {Component, OnInit, ViewChild} from '@angular/core';
import Chart from "chart.js/auto";
import {StatisticsService} from "../../core/services/statistics.service";
import {MatTableDataSource} from "@angular/material/table";

import {MatPaginator} from "@angular/material/paginator";

interface dataset {
  label: number;
  data: number[];
  backgroundColor: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataResponse: any;
  dataset: dataset = {label: 0, data: [], backgroundColor: 'red'};
  datasets: dataset[] = [];
  datasets2: dataset[] = [];
  monthlyChart: any;
  quarterlyChart: any;
  brandChart: any;
  labels: string[] = [];
  data: number[] = []
  background: string[] = [];
  dataResponse2: any;
  productSoleds: ProductSoled[] = [];
  displayedColumns: string[] = ['position', 'maSanPham', 'productName', 'quantitySold', 'totalRevenue'];
  dataSource = new MatTableDataSource<ProductSoled>(this.productSoleds);
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  resultsLength = 0;


  colors: string[] = ['#783F68', '#E5AECE', '#F9AEC5', '#FF9A96', '#EDBF9D', '#FFC184', '#FEE5AD', '#FEEEA1', '#DCECBD', '#D7E1E3']

  constructor(private statisticsSV: StatisticsService) {
  }

  ngOnInit() {
    this.loadQuarterlyChartData(2023, 2023);
    this.loadDataByMonth(2023, 2023);
    this.loadDataBrand();
    this.loadDataBestSeller();
  }

  createChartByMonth(dataset: any) {
    if (this.monthlyChart) {
      this.monthlyChart.destroy();
    }
    this.monthlyChart = new Chart("monthlyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: dataset
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

  loadDataByMonth(yearForm: number, yearTo: number) {
    this.datasets = [];

    this.statisticsSV
      .loadStatisticsByMonth(yearForm, yearTo)
      .subscribe((response) => {
        this.dataResponse = response
        for (let i = yearForm; i <= yearTo; i++) {
          let doanhthu: number[] = [];
          let count = i;
          for (let j = 0; j < 12; j++) {
            if (this.dataResponse.result[i][j] == undefined) {

            } else {
              doanhthu.push(this.dataResponse.result[i][j].doanhthu);
            }
          }

          // this.dataPerYear.push(doanhthu);
          this.dataset = {label: i, data: doanhthu, backgroundColor: this.colors[count]};
          this.datasets.push(this.dataset);
        }
        this.createChartByMonth(this.datasets);
      })

  }

  createChartBrand(labels: any, data: any, background: any) {
    this.brandChart = new Chart("brandChart", {
      type: 'doughnut', //this denotes tha type of chart
      data: {
        labels: labels,
        datasets: [{
          label: 'Doanh thu',
          data: data,
          backgroundColor: background,
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  loadDataBrand() {
    this.statisticsSV
      .loadStatisticsByBrand()
      .subscribe((res) => {
          this.dataResponse = res;
          for (let i = 0; i < this.dataResponse.revenueByBrand.length; i++) {
            this.labels.push(this.dataResponse.revenueByBrand[i].brand)
            this.data.push(this.dataResponse.revenueByBrand[i].totalRevenue);
            this.background.push(this.colors[i]);
          }
          this.createChartBrand(this.labels, this.data, this.background);
        }
      )
  }

  createQuarterlyChart(dataset: any) {
    if (this.quarterlyChart) {
      this.quarterlyChart.destroy();
    }
    this.quarterlyChart = new Chart("quarterlyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['1', '2', '3', '4'],
        datasets: dataset
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

  loadQuarterlyChartData(yearForm: number, yearTo: number) {
    // this.datasets = [];

    this.statisticsSV
      .loadStatisticsByQuarter(yearForm, yearTo)
      .subscribe((response) => {
        this.dataResponse = response
        for (let i = yearForm; i <= yearTo; i++) {
          let doanhthu: number[] = [];
          let count = i;
          for (let j = 0; j < 12; j++) {
            if (this.dataResponse.result[i][j] == undefined) {

            } else {
              doanhthu.push(this.dataResponse.result[i][j].doanhthu);
            }
          }

          // this.dataPerYear.push(doanhthu);
          this.dataset = {label: i, data: doanhthu, backgroundColor: this.colors[count]};
          this.datasets2.push(this.dataset);
        }
        this.createQuarterlyChart(this.datasets2);
      })
  }

  loadDataBestSeller() {
    this.statisticsSV
      .loadStatisticsByProductSoled()
      .subscribe(res => {
        this.dataResponse2 = res;
        console.log(res)
        this.productSoleds = this.dataResponse2.productsByQuantitySold;
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
