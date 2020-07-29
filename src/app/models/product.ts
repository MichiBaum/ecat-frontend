export interface Product {
  id: number;
  name: string;
  articleNr: string;
  description: string;
  price: number;
  productFamilyId?: number;
}
