import {ReturnProductImageDto} from "./return-product-image-dto";

export class Product {
  id: number;
  name: string;
  articleNr: string;
  description: string;
  price: number;
  productFamilyId: number;
  returnProductImageDtos: ReturnProductImageDto[];

  constructor(id: number = 0,
              name: string = '',
              articleNr: string = '',
              description: string = '',
              price: number = 0,
              productFamilyId: number = 0,
              returnProductImageDtos: ReturnProductImageDto[] = [])
  {
    this.id = id;
    this.name = name;
    this.articleNr = articleNr;
    this.description = description;
    this.price = price;
    this.productFamilyId = productFamilyId;
    this.returnProductImageDtos = returnProductImageDtos
  }
}
