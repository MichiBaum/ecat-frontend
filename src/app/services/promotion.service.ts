import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Promotion} from "../classes/promotion";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  promotionsPath: string = 'http://localhost:8080/api/promotions';

  constructor(private http: HttpClient) { }

  getPromotions(){
    return this.http.get<Promotion[]>(this.promotionsPath);
  }

}
