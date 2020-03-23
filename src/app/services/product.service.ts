import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../classes/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productPath: string = 'http://localhost:8080/api/allProducts';

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.productPath);
  }
}
