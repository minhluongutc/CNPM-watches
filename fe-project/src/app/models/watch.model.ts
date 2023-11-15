export class Watch {
  public maSanPham: string;
  public tenSanPham: string;
  public giaSanPham: number;
  public slTonKho: number;
  public anhSP: string;
  public moTaSP: string;
  public ngayThemSP: string;
  public maSeri: string;
  public tenLoai: string;
  public tenThuongHieu: string;
  public tenQG: string;
  public baoHanhSP: string;
  public giamGiaSP: string;
  public kichThuoc: number | string;
  public tenCCHD: string;
  public loaiDayDeo: string;
  public tenCL: string;
  public tenHinhDang: string;
  public tenmauDD: string;
  public soLuongSP: number


  constructor(maSanPham: string, tenSanPham: string, giaSanPham: number, slTonKho: number, anhSP: string, moTaSP: string, ngayThemSP: string, maSeri: string, tenLoai: string, tenThuongHieu: string, tenQG: string, baoHanhSP: string, giamGiaSP: string, kichThuoc: number | string, tenCCHD: string, loaiDayDeo: string, tenCL: string, tenHinhDang: string, tenmauDD: string, soLuongSP: number) {
    this.maSanPham = maSanPham;
    this.tenSanPham = tenSanPham;
    this.giaSanPham = giaSanPham;
    this.slTonKho = slTonKho;
    this.anhSP = anhSP;
    this.moTaSP = moTaSP;
    this.ngayThemSP = ngayThemSP;
    this.maSeri = maSeri;
    this.tenLoai = tenLoai;
    this.tenThuongHieu = tenThuongHieu;
    this.tenQG = tenQG;
    this.baoHanhSP = baoHanhSP;
    this.giamGiaSP = giamGiaSP;
    this.kichThuoc = kichThuoc;
    this.tenCCHD = tenCCHD;
    this.loaiDayDeo = loaiDayDeo;
    this.tenCL = tenCL;
    this.tenHinhDang = tenHinhDang;
    this.tenmauDD = tenmauDD;
    this.soLuongSP = soLuongSP;
  }
}
