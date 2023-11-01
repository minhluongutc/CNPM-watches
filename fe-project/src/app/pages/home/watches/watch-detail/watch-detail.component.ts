import {Component, OnInit} from '@angular/core';
import {Watch} from "../../../../models/watch.model";
import {ActivatedRoute, Params} from "@angular/router";
import {WatchService} from "../../../../core/services/watch.service";

@Component({
  selector: 'app-watch-detail',
  templateUrl: './watch-detail.component.html',
  styleUrls: ['./watch-detail.component.css']
})
export class WatchDetailComponent implements OnInit {
  watch: Watch = new Watch(
    0,
    'SANTOS DE CARTIER WATCH',
    'Medium model, automatic movement, steel, interchangeable metal and leather straps',
    7050,
    false,
    'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw0def5065/images/large/989df64c6ea052df93fdbfe6ff8afb7f.png?sw=350&sh=350&sm=fit&sfrm=png',
    []
  );
  id: number = 0;

  constructor(private route: ActivatedRoute, private watchService: WatchService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.watch = this.watchService.getWatch(this.id);
    });
  }
}
