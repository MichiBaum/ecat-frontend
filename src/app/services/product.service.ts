import {EventEmitter, Injectable, Output} from '@angular/core';
import {Product} from "../models/product";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";
import {SaveProductDto} from "../models/save-product-dto";
import {SaveProductImageDto} from "../models/save-product-image-dto";
import {ReturnProductImageDto} from "../models/return-product-image-dto";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  @Output() products: EventEmitter<Product[]> = new EventEmitter<Product[]>();
  @Output() newProduct: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private router: Router, private apiService: ApiService) { }

  addNewProduct(product: Product){
    this.newProduct.emit(product);
  }

  saveProduct(saveProductDto: SaveProductDto): Observable<Product>{
    return this.apiService.postSingle<Product>('/products/save', saveProductDto);
  }
  saveProductImage(saveProductImageDto: SaveProductImageDto): Observable<ReturnProductImageDto> {
    return this.apiService.postSingle('/products/image', this.saveProductImageDtoToFormData(saveProductImageDto));
  }

  private saveProductImageDtoToFormData(saveProductImageDto: SaveProductImageDto): FormData{
    const formData = new FormData();
    formData.append('file', saveProductImageDto.file);
    formData.append('id', JSON.stringify(saveProductImageDto.id));
    formData.append('fileName', saveProductImageDto.fileName);
    formData.append('index', JSON.stringify(saveProductImageDto.index));
    formData.append('productId', JSON.stringify(saveProductImageDto.productId));
    return formData;
  }

  saveProductImageIndex(productImageId: number, productImageIndex: number){
    return this.apiService.postSingle('/products/image/' + productImageId, productImageIndex);
  }

  deleteProductImage(saveProductImageDtoId: number){
    return this.apiService.deleteSingle('/products/image/' + saveProductImageDtoId);
  }

  deleteProduct(productId: number): Observable<void>{
    return this.apiService.deleteSingle('/products/' + productId);
  }

  search(searchtext?: string, withredirect?: boolean) {
    const path = "/products/search";
    this.apiService.getAll<Product>(`${path}`, {params: {"searchtext": searchtext}}).subscribe(
      (products) => {
        if (withredirect) {
          this.router.navigate(['/search', searchtext]).then(() => {
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
