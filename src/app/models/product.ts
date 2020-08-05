import {ReturnProductImageDto} from "./return-product-image-dto";

export interface Product {
  id: number;
  name: string;
  articleNr: string;
  description: string;
  price: number;
  productFamilyId?: number;
  returnProductImageDtos?: ReturnProductImageDto[];
}
