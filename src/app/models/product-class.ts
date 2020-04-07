import {ProductFamily} from "./product-family";

export interface ProductClass {
  id: number;
  name: string;
  productFamilies: ProductFamily[];
}
