import {ProductClass} from "./product-class";

export interface ProductGroup {
  id: number;
  name: string;
  productClasses: ProductClass[];
}
