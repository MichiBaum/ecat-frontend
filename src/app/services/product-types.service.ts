import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductGroup} from "../models/product-group";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ProductTypesService {

  private productsGroupUrl: string = 'http://localhost:8080/api/productsgroups';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getGroups(){
    return this.http.get<ProductGroup[]>(this.productsGroupUrl);
  }

  getFamilies(){
    return this.apiService.getAll('/productfamilies');
  }

}
