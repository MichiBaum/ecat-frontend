import {Product} from "./product";

export interface ProductFamily {
  id: number;
  name: string;
  products: Product[];
}
