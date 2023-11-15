import {Component, OnDestroy, OnInit} from '@angular/core';
import {WatchService} from "../../../../core/services/watch.service";
import {Watch} from "../../../../models/watch.model";
import {CartService} from "../../../../core/services/cart.service";
import {MessageService} from "primeng/api";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs";

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
  searchQuery: string = '';
  response: any;

  constructor(private watchService: WatchService, private cartSV: CartService, private messageService: MessageService) {
    this.setupSearch();
  }

  ngOnInit(): void {
    // this.searchQuery = ''
    this.isLoading = true;
    this.getWatches(Number(this.currentPage), this.searchQuery);
    // @ts-ignore
    this.gridMode = JSON.parse(localStorage.getItem('gridMode')) ?? true;
    console.log(this.watches)
  }

  getWatches(pageNo: number, query: string) {
    this.watchService
      .getWatches(pageNo, 12, query)
      .subscribe(
        (response) => {
          response.links.shift();
          response.links.pop();
          this.watches = response.data;
          this.dataResponse = response;
          this.isLoading = false;
        });
  }

  changePage(label: string) {
    this.currentPage = label;
    this.isLoading = true;
    this.getWatches(Number(this.currentPage), this.searchQuery);
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

  onInputChange() {
    this.isLoading = true;
    this.watchService.updateSearchQuery(this.searchQuery);
  }

  enterOrClickSearch() {

  }

  setupSearch(): void {
    this.watchService
      .searchObservable.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => this.watchService.getWatches(1, 12, query))
    )
      .subscribe((results) => {
          results.links.shift();
          results.links.pop();
          this.watches = results.data;
          this.response = results;
          // console.log(this.searchResults)
          console.log(results);
          this.isLoading = false;
        },
        (error) => {
          // this.showError();
          console.error('Error searching product: ', error);
        });
    console.log('sos')
  }


}
