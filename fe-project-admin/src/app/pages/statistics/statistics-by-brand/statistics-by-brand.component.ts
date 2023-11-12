import {Component, OnInit} from '@angular/core';
import Chart from "chart.js/auto";
import {StatisticsService} from "../../../core/services/statistics.service";


@Component({
  selector: 'app-statistics-by-brand',
  templateUrl: './statistics-by-brand.component.html',
  styleUrls: ['./statistics-by-brand.component.css']
})
export class StatisticsByBrandComponent implements OnInit {
  public chart: any;
  dataResponse: any;
  colors: string[] = ['#783F68', '#E5AECE', '#F9AEC5', '#FF9A96', '#EDBF9D', '#FFC184', '#FEE5AD', '#FEEEA1', '#DCECBD', '#D7E1E3']
  labels: string[] = [];
  data: number[] = []
  background: string[] = [];
  color: string[] = [];

  constructor(private statisticsSV: StatisticsService) {
  }

  ngOnInit() {
    this.loadData();
  }

  createChart(labels: any, data: any, background: any) {
    this.chart = new Chart("MyChart", {
      type: 'doughnut', //this denotes tha type of chart
      data: {
        labels: labels,
        datasets: [{
          label: 'Doanh thu',
          data: data,
          backgroundColor: this.background,
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  loadData() {
    this.statisticsSV
      .loadStatisticsByBrand()
      .subscribe((res) => {
          this.dataResponse = res;
          for (let i = 0; i < this.dataResponse.revenueByBrand.length; i++) {
            this.labels.push(this.dataResponse.revenueByBrand[i].brand)
            this.data.push(this.dataResponse.revenueByBrand[i].totalRevenue);
            this.background.push(this.colors[i]);
          }
          this.createChart(this.labels, this.data, this.background);
        }
      )
  }
}
