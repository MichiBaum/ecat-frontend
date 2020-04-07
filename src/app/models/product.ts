export interface Product {
  id: number;
  name: string;
  articleNr: string;
  pictureName?: string;
  description: string;
  price: number;
  productFamilyId?: number;
}
