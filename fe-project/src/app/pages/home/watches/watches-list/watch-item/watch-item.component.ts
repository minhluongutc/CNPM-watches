import {Component, Input, OnInit} from '@angular/core';
import {Watch} from "../../../../../models/watch.model";

@Component({
  selector: 'app-watch-item',
  templateUrl: './watch-item.component.html',
  styleUrls: ['./watch-item.component.css']
})
export class WatchItemComponent implements OnInit {
  @Input() watch: Watch = new Watch(
    0,
    'SANTOS DE CARTIER WATCH',
    'Medium model, automatic movement, steel, interchangeable metal and leather straps',
    7050,
    false,
    'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw0def5065/images/large/989df64c6ea052df93fdbfe6ff8afb7f.png?sw=350&sh=350&sm=fit&sfrm=png',
    []
  )

  constructor() {
  }

  ngOnInit() {
  }
}
