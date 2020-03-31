import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../classes/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productPath: string = 'http://localhost:8080/api/products/all';
  private productDelete: string = 'http://localhost:8080/api/products/';

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.productPath);
  }
  deleteProduct(productId: number){
    return this.http.delete(this.productDelete + productId);
  }

}
