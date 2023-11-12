import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import Chart from 'chart.js/auto';
import {StatisticsService} from "../../../core/services/statistics.service";
import {Subject} from "rxjs";

interface dataset {
  label: number;
  data: number[];
  backgroundColor: string;
}


@Component({
  selector: 'app-statistics-by-month',
  templateUrl: './statistics-by-month.component.html',
  styleUrls: ['./statistics-by-month.component.css']
})
export class StatisticsByMonthComponent implements OnInit, OnDestroy {
  public chart: any;
  dataResponse: any;
  dataPerYear: number[][] = [];
  datasets: dataset[] = [];
  dataset: dataset = {label: 0, data: [], backgroundColor: 'red'};
  colors: string[] = ['#783F68', '#E5AECE', '#F9AEC5', '#FF9A96', '#EDBF9D', '#FFC184', '#FEE5AD', '#FEEEA1', '#DCECBD', '#D7E1E3']
  yearsFromArray: number[] = [2019, 2020, 2021, 2022, 2023];
  yearsToArray: number[] = [];
  fromYearSelected: number = 2023;
  toYearSelected: number = 2023;
  private onDestroy$ = new Subject<boolean>();

  constructor(private statisticsSV: StatisticsService) {

  }

  ngOnInit() {
    for (let i: number = this.fromYearSelected; i <= 2023; i++) {
      if (i >= this.fromYearSelected) {
        this.yearsToArray.push(i);
      }
    }
    console.log(this.yearsToArray)
    // this.createChart();
    this.loadData(this.fromYearSelected, this.toYearSelected);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  createChart(dataset: any) {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart("MyChart", {
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

  loadData(yearForm: number, yearTo: number) {
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

          this.dataPerYear.push(doanhthu);
          this.dataset = {label: i, data: doanhthu, backgroundColor: this.colors[count]};
          this.datasets.push(this.dataset);
        }
        this.createChart(this.datasets);
      })
  }

  onChangeFromYearSelected(value: number) {
    this.fromYearSelected = value;
    this.yearsToArray = []

    if (this.fromYearSelected > this.toYearSelected) {
      this.toYearSelected = this.fromYearSelected;
    }
    this.ngOnInit();
  }

  onChangeToYearSelected(value: number) {
    this.toYearSelected = value;
    this.ngOnInit();
  }
}
