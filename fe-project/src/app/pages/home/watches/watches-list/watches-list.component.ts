import {Component, OnDestroy, OnInit} from '@angular/core';
import {WatchService} from "../../../../core/services/watch.service";
import {Watch} from "../../../../models/watch.model";
import {CartService} from "../../../../core/services/cart.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-watches-list',
  templateUrl: './watches-list.component.html',
  styleUrls: ['./watches-list.component.css']
})
export class WatchesListComponent implements OnInit, OnDestroy {
  dataResponse: any;
  watches: Watch[] = [];
  gridMode: boolean = true;
  isLoading = false;
  currentPage: string = '1';

  constructor(private watchService: WatchService, private cartSV: CartService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getWatches(Number(this.currentPage));
    // @ts-ignore
    this.gridMode = JSON.parse(localStorage.getItem('gridMode')) ?? true;
    console.log(this.watches)
  }

  getWatches(pageNo: number) {
    this.watchService
      .getWatches(pageNo, 12, '')
      .subscribe(
        (response) => {
          response.links.shift();
          response.links.pop();
          this.watches = response.data;
          this.dataResponse = response;
          // for (let watch of this.watches) {
          //   this.datatest = this.getImage(watch.maSanPham);
          //   watch.anhSP = this.datatest;
          //   console.log(watch)
          // }
          this.isLoading = false;
        });
  }

  changePage(label: string) {
    this.currentPage = label;
    this.isLoading = true;
    this.getWatches(Number(this.currentPage));
  }


  ngOnDestroy() {
    // localStorage.removeItem('gridMode')
  }

  onGrid() {
    this.gridMode = true;
    localStorage.setItem('gridMode', JSON.stringify(this.gridMode));
  }

  onFeed() {
    this.gridMode = false;
    localStorage.setItem('gridMode', JSON.stringify(this.gridMode));
  }

  showError(message: string) {
    return this.messageService.add({severity: 'error', summary: 'Thất bại', detail: message});
  }

  showSuccess(message: string) {
    return this.messageService.add({severity: 'success', summary: 'Thành công', detail: message});
  }

}
