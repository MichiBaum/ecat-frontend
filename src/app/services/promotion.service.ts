import { Injectable } from '@angular/core';
import {Promotion} from "../models/promotion";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private promotionsPath: string = '/promotions';
  private savePromotionsPath: string = '/promotions/save';
  constructor(private apiService: ApiService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.apiService.getAll<Promotion>(this.promotionsPath);
  }

  savePromotion(promotion: Promotion) {
    return this.apiService.postSingle<Promotion>(this.savePromotionsPath, promotion);
  }

  savePromotionImage(formData: FormData, id: number) {
    return this.apiService.postSingle('/promotions/image/' + id, formData);
  }

  deletePromotion(promotionId: number){
    return this.apiService.deleteSingle(this.promotionsPath + '/' + promotionId);
  }

}
