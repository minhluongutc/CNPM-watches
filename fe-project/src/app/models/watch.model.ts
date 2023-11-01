export class Watch {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public isWishList: boolean;
  public img: string;
  public imgDetails: string[];

  constructor(id: number, name: string, description: string, price: number, isWishList: boolean, img: string, imgDetails: string[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.isWishList = isWishList;
    this.img = img;
    this.imgDetails = imgDetails;
  }
}
