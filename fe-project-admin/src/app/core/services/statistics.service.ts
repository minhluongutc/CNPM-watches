import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class StatisticsService {
  private statisticsUrl: string = 'http://127.0.0.1:8000/api'
  statisticsByMonthData: any;
  statisticsByQuarterData: any;
  statisticsByBrandData: any;
  statisticsByProductSoldData: any;

  constructor(private http: HttpClient) {
  }

  loadStatisticsByMonth(yearForm: number, yearTo: number) {
    return this.http.get(`${this.statisticsUrl}/monthlyRevenues?start_year=${yearForm}&end_year=${yearTo}`);
  }

  getStatisticsByMonthData(): any {
    return this.statisticsByMonthData;
  }

  setStatisticsByMonthData(data: any): void {
    this.statisticsByMonthData = data;
  }

  loadStatisticsByQuarter(yearForm: number, yearTo: number) {
    return this.http.get(`${this.statisticsUrl}/quarterlyRevenues?start_year=${yearForm}&end_year=${yearTo}`);
  }

  getStatisticsByQuarterData(): any {
    return this.statisticsByMonthData;
  }

  setStatisticsByQuarterData(data: any): void {
    this.statisticsByMonthData = data;
  }

  loadStatisticsByProductSoled() {
    return this.http.get(`${this.statisticsUrl}/productsByQuantitySoldLastMonth`);
  }

  loadStatisticsByBrand() {
    return this.http.get(`${this.statisticsUrl}/revenueByBrand`);
  }
}
