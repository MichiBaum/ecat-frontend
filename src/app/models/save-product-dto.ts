export class SaveProductDto {
  constructor(rawValue: any) {
    this.id = rawValue.id;
    this.name = rawValue.name;
    this.articleNr = rawValue.articleNr;
    this.description = rawValue.description
    this.price = rawValue.price;
    this.productFamilyId = rawValue.productFamilyId;
  }

  id: number;
  name: string;
  articleNr: string;
  description: string;
  price: number;
  productFamilyId?: number;
}
