import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Promotion} from "../models/promotion";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private promotionsPath: string = '/promotions';
  private savePromotionsPath: string = '/promotions/save';
  constructor(private http: HttpClient, private apiService: ApiService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.apiService.getAll<Promotion>(this.promotionsPath);
  }

  savePromotion(promotion: Promotion) {
    return this.apiService.postSingle<Promotion>(this.savePromotionsPath, promotion);
  }

  deletePromotion(promotionId: number){
    return this.apiService.deleteSingle(this.promotionsPath + '/' + promotionId);
  }

}
