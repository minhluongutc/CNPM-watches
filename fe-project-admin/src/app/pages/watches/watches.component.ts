import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectionModel} from '@angular/cdk/collections';
import {MatIconModule} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {DataStorageService} from "../../core/services/data-storage.service";
import {Watch} from "../../models/watch.model";
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'app-watches',
  templateUrl: './watches.component.html',
  styleUrls: ['./watches.component.css'],
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, MatIconModule, NgIf, NgForOf, MatButtonModule, SharedModule],
})
export class WatchesComponent implements OnInit {
  watches: Watch[] = [];
  // displayedColumns: string[] = ['maSanPham'];
  displayedColumns: string[] = ['select', 'maSanPham', 'tenSanPham', 'giaSanPham', 'slTonKho', 'anhSP', 'moTaSP', 'ngayThemSP', 'maSeri', 'tenLoai', 'tenThuongHieu', 'tenQG', 'baoHanhSP', 'giamGiaSP', 'maSanPham', 'anhChiTietSP', 'kichThuoc', 'tenCCHD', 'loaiDayDeo', 'tenCL', 'tenHinhDang', 'tenmauDD', 'star']
  dataSource = new MatTableDataSource<Watch>(this.watches);
  selection = new SelectionModel<Watch>(true, []);
  pageSizeSelected: string = '5';
  currentPage: string = '1';
  isLoading: boolean = false;
  isLoadingInit: boolean = false;
  response: any;

  constructor(public dialog: MatDialog, private dataStorageSv: DataStorageService) {
  }

  ngOnInit() {
    // console.log(this.isLoading)
    this.isLoadingInit = true;
    this.loadData(Number(this.currentPage), Number(this.pageSizeSelected));
    // this.loadData(1, 1);
  }

  loadData(pageNo: number, pageSize: number) {
    this.selection = new SelectionModel<Watch>(true, []);
    this.isLoading = true;
    this.dataStorageSv.getWatches(pageNo, pageSize).subscribe((response) => {
      response.links.shift();
      response.links.pop();
      this.watches = response.data;
      this.response = response;
      this.dataSource = new MatTableDataSource<Watch>(this.watches);
      // if (this.currentPage > response.last_page) {
      //   this.loadData(1, 5);
      // }
      this.isLoading = false;
      this.isLoadingInit = false;
    });

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Watch): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return 'checkboxLabel function';
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onChangedPageSize(value: string) {
    this.currentPage = '1';
    this.pageSizeSelected = value;
    this.isLoading = true;
    this.loadData(1, Number(this.pageSizeSelected));
  }

  changePage(label: string) {
    this.currentPage = label;
    this.isLoading = true;
    this.loadData(Number(this.currentPage), Number(this.pageSizeSelected));
  }

}
