import {Component, OnDestroy, OnInit} from '@angular/core';
import {Watch} from "../../../../models/watch.model";
import {WatchService} from "../../../../core/services/watch.service";

@Component({
  selector: 'app-watches-list',
  templateUrl: './watches-list.component.html',
  styleUrls: ['./watches-list.component.css']
})
export class WatchesListComponent implements OnInit, OnDestroy {
  watches: Watch[] = []
  gridMode: boolean = true;
  numberOfWatches: number = 0;

  constructor(private watchService: WatchService) {
  }

  ngOnInit(): void {
    this.watches = this.watchService.getWatches();
    this.numberOfWatches = this.watches.length;
    // @ts-ignore
    this.gridMode = JSON.parse(localStorage.getItem('gridMode')) ?? true;
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

}
