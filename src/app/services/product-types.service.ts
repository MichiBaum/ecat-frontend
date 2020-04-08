import { Injectable } from '@angular/core';
import {ProductGroup} from "../models/product-group";
import {ApiService} from "./api.service";
import {ProductFamily} from "../models/product-family";

@Injectable({
  providedIn: 'root'
})
export class ProductTypesService {

  private productsGroupUrl: string = '/productsgroups';
  private productFamiliesUrl: string = '/productfamilies';

  constructor(private apiService: ApiService) { }

  getGroups(){
    return this.apiService.getAll<ProductGroup>(this.productsGroupUrl);
  }

  getFamilies(){
    return this.apiService.getAll<ProductFamily>(this.productFamiliesUrl);
  }

}
