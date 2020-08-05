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

  savePromotionImage(savePromotionImageDto: SavePromotionImageDto): Observable<ReturnPromotionImageDto> {
    return this.apiService.postSingle('/promotions/image', this.savePromotionImageDtoToFormData(savePromotionImageDto));
  }

  private savePromotionImageDtoToFormData(promotionImage: SavePromotionImageDto): FormData{
    const formData = new FormData();
    formData.append('file', promotionImage.file);
    formData.append('id', JSON.stringify(promotionImage.id));
    formData.append('fileName', promotionImage.fileName);
    formData.append('index', JSON.stringify(promotionImage.index));
    formData.append('promotionId', JSON.stringify(promotionImage.promotionId));
    return formData;
  }

  savePromotionImageIndex(promotionImageId: number, promotionImageIndex: number){
    return this.apiService.postSingle('/promotions/image/' + promotionImageId, promotionImageIndex);
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
