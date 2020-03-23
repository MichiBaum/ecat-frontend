import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductGroup} from "../classes/product-group";

@Injectable({
  providedIn: 'root'
})
export class ProductTypesService {

  productsGroupUrl: string = 'http://localhost:8080/api/productsgroups';

  constructor(private http: HttpClient) { }

  getGroups(){
    return this.http.get<ProductGroup[]>(this.productsGroupUrl);
  }
}
