import {EventEmitter, Injectable, Output} from '@angular/core';
import {Product} from "../models/product";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";
import {SaveProductDto} from "../models/save-product-dto";
import {ProductImage} from "../models/product-image";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  @Output() products: EventEmitter<Product[]> = new EventEmitter<Product[]>();

  constructor(private router: Router, private apiService: ApiService) { }

  getProducts(): Observable<Product[]>{
    return this.apiService.getAll<Product>('/products');
  }

  saveProduct(saveProductDto: SaveProductDto): Observable<Product>{
    return this.apiService.postSingle<Product>('/products/save', saveProductDto);
  }
  saveProductImage(formData: FormData): Observable<ProductImage> {
    return this.apiService.postSingle('/products/image', formData);
  }

  saveProductImageIndex(productImage: ProductImage){
    return this.apiService.postSingle('/products/image' + productImage.id, productImage.index);
  }

  deleteProduct(productId: number): Observable<void>{
    return this.apiService.deleteSingle('/products/' + productId);
  }

  search(searchtext?: string, withredirect?: boolean) {
    const path = "/products/search";
    this.apiService.getAll<Product>(`${path}`, {params: {"searchtext": searchtext}}).subscribe(
      (products) => {
        if (withredirect) {
          this.router.navigate(['/products']).then(() => {
            this.products.emit(products as Product[])
          });
        } else {
          this.products.emit(products as Product[])
        }
      }
    )
  }

  searchProductGroup(id: any, withredirect: boolean) {
    const path = "/productgroups/";
    this.findProductByProductType(path, id, withredirect);
  }

  searchProductFamily(id: any, withredirect: boolean) {
    const path = "/productfamilies/";
    this.findProductByProductType(path, id, withredirect);
  }

  searchProductClass(id: any, withredirect: boolean) {
    const path = "/productclasses/";
    this.findProductByProductType(path, id, withredirect);
  }

  private findProductByProductType(path: string, id: any, withredirect: boolean) {
    this.apiService.getAll<Product>(`${path}${id}`).subscribe(
      (products) => {
        if (withredirect) {
          this.router.navigate(['/products']).then(() => {
            this.products.emit(products as Product[])
          });
        } else {
          this.products.emit(products as Product[])
        }
      }
    )
  }
}
