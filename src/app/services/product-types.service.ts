import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductGroup} from "../models/product-group";
import {ApiService} from "./api.service";
import {ProductFamily} from "../models/product-family";

@Injectable({
  providedIn: 'root'
})
export class ProductTypesService {

  private productsGroupUrl: string = '/productsgroups';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getGroups(){
    return this.apiService.getAll<ProductGroup>(this.productsGroupUrl);
  }

  getFamilies(){
    return this.apiService.getAll<ProductFamily>('/productfamilies');
  }

}
