import {EventEmitter, Injectable, Output} from '@angular/core';
import {Promotion} from "../models/promotion";

@Injectable({
  providedIn: 'root'
})
export class PromotionEditorService {

  constructor() { }

  @Output() promotionEmitter: EventEmitter<Promotion> = new EventEmitter<Promotion>();
  @Output() showPromotionEditorEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  editPromotion(promotion: Promotion){
    this.promotionEmitter.emit(promotion);
    this.showPromotionEditorEmitter.emit(true);
  }

}
