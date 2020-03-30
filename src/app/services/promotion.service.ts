import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Promotion} from "../classes/promotion";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private promotionsPath: string = 'http://localhost:8080/api/promotions';
  private savePromotionsPath: string = 'http://localhost:8080/api/promotions/save'
  constructor(private http: HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.promotionsPath);
  }

  savePromotion(promotion: Promotion) {
    return this.http.post<Promotion>(this.savePromotionsPath, promotion);
  }

  deletePromotion(promotionId: number){
    return this.http.delete(this.promotionsPath + '/' + promotionId);
  }

}
