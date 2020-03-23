import {ProductClass} from "./product-class";

export interface ProductGroup {
  name: string;
  productClasses: ProductClass[];
}
