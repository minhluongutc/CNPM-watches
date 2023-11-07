import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectionModel} from '@angular/cdk/collections';
import {MatIconModule} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {WatchService} from "../../core/services/watch.service";
import {Watch} from "../../models/watch.model";
import {SharedModule} from "../../shared/shared.module";
import {ToastModule} from 'primeng/toast';
import {MessageService} from "primeng/api";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {WatchSizeService} from "../../core/services/watchSize.service";
import {WatchCCHDService} from "../../core/services/watchCCHD.service";
import {WatchBrandService} from "../../core/services/watchBrand.service";
import {WatchStrapService} from "../../core/services/watchStrap.service";
import {WatchMaterialService} from "../../core/services/watchMaterial.service";
import {WatchTypeService} from "../../core/services/watchType.service";
import {WatchShapeService} from "../../core/services/watchShape.service";

@Component({
  selector: 'app-watches',
  templateUrl: './watches.component.html',
  styleUrls: ['./watches.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    NgIf,
    NgForOf,
    MatButtonModule,
    SharedModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService]
})
export class WatchesComponent implements OnInit {
  watches: Watch[] = [];
  // displayedColumns: string[] = ['maSanPham'];
  displayedColumns: string[] = ['select', 'maSanPham', 'tenSanPham', 'giaSanPham', 'slTonKho', 'anhSP', 'moTaSP', 'ngayThemSP', 'maSeri', 'tenLoai', 'tenThuongHieu', 'tenQG', 'baoHanhSP', 'giamGiaSP', 'maSanPham', 'anhChiTietSP', 'kichThuoc', 'tenCCHD', 'loaiDayDeo', 'tenCL', 'tenHinhDang', 'tenmauDD', 'star']
  dataSource = new MatTableDataSource<Watch>(this.watches);
  selection = new SelectionModel<Watch>(true, []);
  addForm: FormGroup = new FormGroup<any>({});
  editForm: FormGroup = new FormGroup<any>({});
  idsSelected: string[] = [];
  pageSizeSelected: string = '5';
  currentPage: string = '1';
  isLoading: boolean = false;
  isLoadingInit: boolean = false;
  isLoadingForm: boolean = false;
  response: any;
  showDeletePopup: boolean = false;
  showFormDelete1SP: boolean = false;
  showAddPopup: boolean = false;
  showUpdatePopup: boolean = false;
  watchSelected = new Watch('', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  searchQuery: string = '';
  searchResults: any[] = [];
  watchSizes: any;
  watchCCHDs: any;
  watchBrands: any;
  watchStraps: any;
  watchMaterials: any;
  watchTypes: any;
  watchShapes: any;
  maLoaiSelected: any;
  maCCHDSelected: any;
  maThuongHieuSelected: any;
  maHinhDangSelected: any;
  maChatLieuSelected: any;
  maDayDeoSelected: any;
  maKichThuocSelected: any;

  constructor(
    private watchService: WatchService,
    private watchSizeService: WatchSizeService,
    private messageService: MessageService,
    private watchCCHDService: WatchCCHDService,
    private watchBrandService: WatchBrandService,
    private watchStrapService: WatchStrapService,
    private watchMaterialService: WatchMaterialService,
    private watchTypeService: WatchTypeService,
    private watchShapeService: WatchShapeService
  ) {
    this.setupSearch();
  }

  ngOnInit() {
    this.isLoadingInit = true;
    this.loadData(Number(this.currentPage), Number(this.pageSizeSelected));
    this.getWatchSizes();
    this.getWatchBrands();
    this.getWatchCCHDs();
    this.getWatchMaterials()
    this.getWatchShapes();
    this.getWatchStraps();
    this.getWatchTypes();
    this.addForm = new FormGroup(
      {
        'name': new FormControl('', [Validators.required]),
        'CCHD': new FormControl('', [Validators.required]),
        'type': new FormControl('', [Validators.required]),
        'brand': new FormControl('', [Validators.required]),
        'size': new FormControl('', [Validators.required]),
        'shape': new FormControl('', [Validators.required]),
        'material': new FormControl('', [Validators.required]),
        'strap': new FormControl('', [Validators.required]),
        'price': new FormControl('', [Validators.required]),
        'image': new FormControl('', [Validators.required]),
        'description': new FormControl('', [Validators.required]),
      }
    )

    this.editForm = new FormGroup(
      {
        'name': new FormControl('', [Validators.required]),
        'CCHD': new FormControl('', [Validators.required]),
        'type': new FormControl('', [Validators.required]),
        'brand': new FormControl('', [Validators.required]),
        'size': new FormControl('', [Validators.required]),
        'shape': new FormControl('', [Validators.required]),
        'material': new FormControl('', [Validators.required]),
        'strap': new FormControl('', [Validators.required]),
        'price': new FormControl('', [Validators.required]),
        'image': new FormControl('', [Validators.required]),
        'description': new FormControl('', [Validators.required]),
      }
    )
    // this.loadData(1, 1);
  }

  loadData(pageNo: number, pageSize: number) {
    this.selection = new SelectionModel<Watch>(true, []);
    this.isLoading = true;
    this.watchService.getWatches(pageNo, pageSize, this.searchQuery).subscribe((response) => {
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
      // this.isLoadingAdd = false;
    });
  }

  deleteWatch(watchId: string) {
    this.isLoading = true;
    this.watchService.deleteWatch(watchId).subscribe(
      () => {
        // this.loadData(Number(this.currentPage), Number(this.pageSizeSelected));
        this.showSuccess('Xóa 1 sản phẩm thành công.');
        this.isLoading = false;
      },
      (error) => {
        this.showError();
        console.error('Error deleting product: ', error);
      })
    this.showFormDelete1SP = false;
    this.idsSelected = [];
  }

  deleteWatches(watchIds: string[]) {
    this.isLoading = true;
    this.watchService.deleteWatches(watchIds).subscribe(
      () => {
        this.loadData(Number(this.currentPage), Number(this.pageSizeSelected));
        this.showSuccess(`Xóa ${watchIds.length} sản phẩm thành công.`);
        this.isLoading = false;
      },
      (error) => {
        this.showError();
        console.error('Error deleting product: ', error);
      })
    this.showDeletePopup = false;
  }

  onAdd(form: FormGroup) {
    this.isLoadingForm = true;
    const name = form.value.name;
    const CCHD = form.value.CCHD;
    const type = form.value.type;
    const brand = form.value.brand;
    const size = form.value.size;
    const shape = form.value.shape;
    const material = form.value.material;
    const strap = form.value.strap;
    const price = form.value.price;
    const image = form.value.image;
    const description = form.value.description;
    console.log(form);
    this.watchService.addWatch(
      name,
      CCHD,
      type,
      brand,
      size,
      shape,
      material,
      strap,
      price,
      image,
      description
    )
      .subscribe(res => {
        this.loadData(1, Number(this.pageSizeSelected));
        this.showAddPopup = false
        this.addForm.reset();
        this.showSuccess('Thêm sản phẩm thành công.');
        this.isLoadingForm = false;
      });
  }

  onEdit(form: FormGroup) {
  }


  setupSearch(): void {
    this.selection = new SelectionModel<Watch>(true, []);
    this.watchService
      .searchObservable.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => this.watchService.getWatches(1, Number(this.pageSizeSelected), query))
    )
      .subscribe((results) => {
          results.links.shift();
          results.links.pop();
          this.watches = results.data;
          this.response = results;
          this.dataSource = new MatTableDataSource<Watch>(this.watches);
          console.log(this.searchResults)
          this.isLoading = false;
        },
        (error) => {
          this.showError();
          console.error('Error searching product: ', error);
        });
    console.log('sos')
  }

  getWatchSizes() {
    this.watchSizes == undefined ? this.watchSizeService.getSizes()
      .subscribe((result) => {
          console.log(result)
          this.watchSizes = result;
        },
        (error) => {
          this.showError();
          console.error('Error getting product sizes: ', error);
        }) : undefined;
  }

  getWatchBrands() {
    this.watchBrands == undefined ? this.watchBrandService.getBrands()
      .subscribe((result) => {
          console.log(result)
          this.watchBrands = result;
        },
        (error) => {
          this.showError();
          console.error('Error getting product brands: ', error);
        }) : undefined;
  }

  getWatchCCHDs() {
    this.watchCCHDs == undefined ? this.watchCCHDService.getCCHD()
      .subscribe((result) => {
          console.log(result)
          this.watchCCHDs = result;
        },
        (error) => {
          this.showError();
          console.error('Error getting product CCHDs: ', error);
        }) : undefined;
  }

  getWatchMaterials() {
    this.watchMaterials == undefined ? this.watchMaterialService.getMaterial()
      .subscribe((result) => {
          console.log(result)
          this.watchMaterials = result;
        },
        (error) => {
          this.showError();
          console.error('Error getting product materials: ', error);
        }) : undefined;
  }

  getWatchShapes() {
    this.watchShapes == undefined ? this.watchShapeService.getShape()
      .subscribe((result) => {
          console.log(result)
          this.watchShapes = result;
        },
        (error) => {
          this.showError();
          console.error('Error getting product shapes: ', error);
        }) : undefined;
  }

  getWatchStraps() {
    this.watchStraps == undefined ? this.watchStrapService.getStraps()
      .subscribe((result) => {
          console.log(result)
          this.watchStraps = result;
        },
        (error) => {
          this.showError();
          console.error('Error getting product straps: ', error);
        }) : undefined;
  }

  getWatchTypes() {
    this.watchTypes == undefined ? this.watchTypeService.getType()
      .subscribe((result) => {
          console.log(result)
          this.watchTypes = result;
        },
        (error) => {
          this.showError();
          console.error('Error getting product types: ', error);
        }) : undefined;
  }

  enterOrClickSearch() {
    this.loadData(1, 5);
  }

  onInputChange(): void {
    this.isLoading = true;
    this.watchService.updateSearchQuery(this.searchQuery);
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

  showDeletePopupFn() {
    for (let watch of this.selection.selected) {
      this.idsSelected.push(watch.maSanPham);
    }
    console.log(this.idsSelected)
    this.showDeletePopup = true;
  }


  hideDeletePopupFn() {
    this.showDeletePopup = false
  }

  showSuccess(message: string) {
    this.messageService.add({severity: 'success', summary: 'Thành công', detail: message});
  }

  showError() {
    this.messageService.add({severity: 'error', summary: 'Thất bại', detail: 'Lỗi hệ thống.'});
  }

  showDeletePopupFn1SP(watch: Watch) {
    this.showFormDelete1SP = true;
    this.watchSelected = watch;
  }

  hideDeletePopupFn1SP() {
    this.showFormDelete1SP = false
    // this.watchSelected = [];
  }

  showAddFormFn() {
    // this.getWatchSizes();
    // this.getWatchBrands();
    // this.getWatchCCHDs();
    // this.getWatchMaterials()
    // this.getWatchShapes();
    // this.getWatchStraps();
    // this.getWatchTypes();
    this.showAddPopup = true;
  }

  hideAddFormFn() {
    this.showAddPopup = false;
  }

  showUpdateFormFn(form: FormGroup, watch: Watch) {
    // this.getWatchSizes();
    // this.getWatchBrands();
    // this.getWatchCCHDs();
    // this.getWatchMaterials()
    // this.getWatchShapes();
    // this.getWatchStraps();
    // this.getWatchTypes();
    // const name = form.value.name;
    // const CCHD = form.value.CCHD;
    // const type = form.value.type;
    // const brand = form.value.brand;
    // const size = form.value.size;
    // const shape = form.value.shape;
    // const material = form.value.material;
    // const strap = form.value.strap;
    // const price = form.value.price;
    // const image = form.value.image;
    // const description = form.value.description;
    this.watchSelected = watch;
    this.editForm.controls['name'].setValue(watch.tenSanPham);
    this.editForm.controls['price'].setValue(watch.giaSanPham);
    this.editForm.controls['image'].setValue(watch.anhSP);
    this.editForm.controls['description'].setValue(watch.moTaSP);
    this.editForm.controls['CCHD'].setValue(watch.tenCCHD);
    for (let cchd of this.watchCCHDs) {
      if (cchd.tenCCHD == watch.tenCCHD) {
        this.maCCHDSelected = cchd.maCCHD;
        break;
      }
    }
    for (let type of this.watchTypes) {
      if (type.tenLoai == watch.tenLoai) {
        this.maLoaiSelected = type.maLoai;
        break;
      }
    }
    for (let brand of this.watchBrands) {
      if (brand.tenThuongHieu == watch.tenThuongHieu) {
        this.maThuongHieuSelected = brand.maThuongHieu;
        break;
      }
    }
    for (let size of this.watchSizes) {
      if (size.kichThuoc == watch.kichThuoc) {
        this.maKichThuocSelected = size.maKichThuoc;
        break;
      }
    }
    for (let shape of this.watchShapes) {
      if (shape.tenHinhDang == watch.tenHinhDang) {
        this.maHinhDangSelected = shape.maHinhDang;
        break;
      }
    }
    for (let material of this.watchMaterials) {
      if (material.tenCL == watch.tenCL) {
        this.maChatLieuSelected = material.maCL;
        break;
      }
    }
    for (let strap of this.watchStraps) {
      if (strap.loaiDayDeo == watch.loaiDayDeo) {
        this.maDayDeoSelected = strap.maDayDeo;
        break;
      }
    }
    console.log(form.value.CCHD == this.watchSelected.tenCCHD);
    console.log('form: ' + form.value.shape);
    console.log(watch.tenCCHD);
    this.showUpdatePopup = true;
  }

  hideUpdateFormFn() {
    this.showUpdatePopup = false;
  }
}
