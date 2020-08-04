import { Injectable } from '@angular/core';
import {Promotion} from "../models/promotion";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";
import {SavePromotionImageDto} from "../models/save-promotion-image-dto";
import {ReturnPromotionImageDto} from "../models/return-promotion-image-dto";

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

  savePromotionImage(formData: FormData): Observable<ReturnPromotionImageDto> {
    return this.apiService.postSingle('/promotions/image', formData);
  }

  savePromotionImageIndex(promotionImage: SavePromotionImageDto){
    return this.apiService.postSingle('/promotions/image/' + promotionImage.id, promotionImage.index);
  }

  deletePromotionImage(promotionImageId: number){
    return this.apiService.deleteSingle('/promotions/image/' + promotionImageId);
  }

  getPromotionImageFile(promotionImageId: number): Observable<File>{
    return this.apiService.getFile('/promotions/image/' + promotionImageId);
  }

  deletePromotion(promotionId: number){
    return this.apiService.deleteSingle(this.promotionsPath + '/' + promotionId);
  }

}
