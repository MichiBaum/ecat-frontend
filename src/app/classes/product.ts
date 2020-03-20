export class Product {
  name: string;
  articleNr: string;
  pictureName: string;
  description: string;
  price: number;

  constructor(name:string, articleNr:string, pictureName:string, description:string, price:number) {
    this.name = name;
    this.articleNr = articleNr;
    this.pictureName = pictureName;
    this.description = description;
    this.price = price
  }
}
