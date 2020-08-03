import { Component } from '@angular/core';
import {Promotion} from "../../models/promotion";
import {PromotionService} from "../../services/promotion.service";
import {MessageService} from "primeng";
import {FormControl, FormGroup} from "@angular/forms";
import {PromotionEditorService} from "../../services/promotion-editor.service";
import {TranslateService} from "@ngx-translate/core";
import {PromotionImage} from "../../models/promotion-image";
import {CustomUploadItem} from "../../models/custom-upload-item";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-promotion-editor',
  templateUrl: './promotion-editor.component.html',
  styleUrls: ['./promotion-editor.component.scss']
})
export class PromotionEditorComponent{

  promotion: Promotion = {id: 0, title: '', description: '', startDate: null, endDate: null};
  promotionImages: PromotionImage[] = [];
  customUploadItems: CustomUploadItem[] = [];
  showDialog: boolean = false;

  promotionForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  constructor(private promotionService: PromotionService,
              private messageService: MessageService,
              private promotionEditorService: PromotionEditorService,
              private translateService: TranslateService,
              private imageService: ImageService
  )
  {
    this.promotionEditorService.promotionEmitter.subscribe(promotion => {
      this.promotion = promotion;
      this.updateForm();
    });
    this.promotionEditorService.showPromotionEditorEmitter.subscribe(showDialog => {
      this.showDialog = showDialog;
    });
  }

  updateForm(){
    this.promotionForm.patchValue(this.promotion);
  }
  savePromotion() {
    this.promotionService.savePromotion(this.promotionForm.getRawValue()).subscribe(data => {
      Object.assign(this.promotion, data);
      this.messageService.add({
        severity:'success',
        summary:this.translateService.instant('toastMessages.success'),
        detail:this.translateService.instant('promotionEditor.successfulSave')});
    },
      (error => {}))
  }

  resetFormToLastState() {
    this.promotionForm.patchValue(this.promotion);
  }

  updateStartDate(date: Date){
    if(date){
      this.promotionForm.controls['startDate'].setValue(date.getTime());
    }else {
      this.messageService.add({severity: 'error', summary: this.translateService.instant('errors.fields.empty'), detail: this.translateService.instant('errors.promotion.endDate.notSet')});
    }
  }

  updateEndDate(date: Date){
    if(date){
      this.promotionForm.controls['endDate'].setValue(date.getTime());
    }else {
      this.messageService.add({severity: 'error', summary: this.translateService.instant('errors.fields.empty'), detail: this.translateService.instant('errors.promotion.startDate.notSet')});
    }
  }

  private promotionImageToFormData(promotionImage: PromotionImage): FormData{
    const formData = new FormData();
    formData.append('image', promotionImage.image);
    formData.append('id', JSON.stringify(promotionImage.id));
    formData.append('imageName', JSON.stringify(promotionImage.imageName));
    formData.append('index', JSON.stringify(promotionImage.index));
    formData.append('promotionId', JSON.stringify(promotionImage.promotionId));
    return formData;
  }

  updatePromotionImagesIndex(updatedIndexes: any){
    for (let [key, value] of updatedIndexes){
      let promotionImage = this.promotionImages.find(productImage => productImage.id == key);
      promotionImage.index = value;
      this.promotionService.savePromotionImageIndex(promotionImage).subscribe(() => {}, error => {});
    }
  }

  saveNewPromotionImage(promotionImageToSave: PromotionImage){
    this.promotionService.savePromotionImage(this.promotionImageToFormData(promotionImageToSave)).subscribe(promotionImage => {
        promotionImage.image = this.imageService.base64ImageToFile(promotionImage.image, promotionImage.imageType, promotionImage.imageName);
        if(promotionImageToSave.id && promotionImage.id !== 0){
          let originalPromotionImage = this.promotionImages.find(promotionImage => promotionImage.id === promotionImageToSave.id);
          Object.assign(originalPromotionImage, promotionImage);
        }else{
          this.promotionImages.push(promotionImage);
          this.customUploadItems.push(this.promotionImageToCustomUploadItem(promotionImage));
        }
      },
      error => {})
  }

  deletePromotionImage(promotionImage: PromotionImage){
    this.promotionService.deletePromotionImage(promotionImage.id).subscribe(() => {
      let promotionImageIndex = this.promotionImages.indexOf(promotionImage);
      let customUploadItemIndex = this.customUploadItems.findIndex(customUploadItem => customUploadItem.id === promotionImage.id);
      this.promotionImages.splice(promotionImageIndex, 1);
      this.customUploadItems.splice(customUploadItemIndex, 1);
    }, error => {});
  }

  customUploadItemToPromotionImage(customUploadItem: CustomUploadItem): PromotionImage{
    return {
      id: customUploadItem.id,
      index: customUploadItem.index,
      image: customUploadItem.file,
      imageName: customUploadItem.file.name,
      promotionId: this.promotion.id
    };
  }

  private promotionImageToCustomUploadItem(promotionImage: PromotionImage): CustomUploadItem{
    return {
      id: promotionImage.id,
      file: promotionImage.image,
      index: promotionImage.index
    }
  }

}
