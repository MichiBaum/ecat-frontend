import { Component } from '@angular/core';
import {Promotion} from "../../models/promotion";
import {PromotionService} from "../../services/promotion.service";
import {MessageService} from "primeng";
import {FormControl, FormGroup} from "@angular/forms";
import {PromotionEditorService} from "../../services/promotion-editor.service";
import {TranslateService} from "@ngx-translate/core";
import {SavePromotionImageDto} from "../../models/save-promotion-image-dto";
import {CustomUploadItem} from "../../models/custom-upload-item";

@Component({
  selector: 'app-promotion-editor',
  templateUrl: './promotion-editor.component.html',
  styleUrls: ['./promotion-editor.component.scss']
})
export class PromotionEditorComponent{

  promotion: Promotion = {id: 0, title: '', description: '', startDate: null, endDate: null};
  savePromotionImageDtos: SavePromotionImageDto[] = [];
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

  private promotionImageToFormData(promotionImage: SavePromotionImageDto): FormData{
    const formData = new FormData();
    formData.append('file', promotionImage.file);
    formData.append('id', JSON.stringify(promotionImage.id));
    formData.append('fileName', promotionImage.fileName);
    formData.append('index', JSON.stringify(promotionImage.index));
    formData.append('promotionId', JSON.stringify(promotionImage.promotionId));
    return formData;
  }

  updatePromotionImagesIndex(updatedIndexes: any){
    for (let [key, value] of updatedIndexes){
      let savePromotionImageDto = this.savePromotionImageDtos.find(productImage => productImage.id == key);
      savePromotionImageDto.index = value;
      this.promotionService.savePromotionImageIndex(savePromotionImageDto).subscribe(() => {}, error => {});
    }
  }

  saveNewPromotionImage(savePromotionImageDto: SavePromotionImageDto){
    this.promotionService.savePromotionImage(this.promotionImageToFormData(savePromotionImageDto)).subscribe(returnPromotionImageDto => {
        this.promotionService.getPromotionImageFile(returnPromotionImageDto.id).subscribe(file => {
          if(savePromotionImageDto.id && returnPromotionImageDto.id !== 0){
            let originalPromotionImage = this.savePromotionImageDtos.find(promotionImage => promotionImage.id === savePromotionImageDto.id);
            Object.assign(originalPromotionImage, returnPromotionImageDto);
          }else{
            this.savePromotionImageDtos.push({
              id: returnPromotionImageDto.id,
              file: file,
              fileName: returnPromotionImageDto.fileName,
              index: returnPromotionImageDto.index,
              promotionId: this.promotion.id});
          }
        }, error => {})
      },
      error => {})
  }

  deletePromotionImage(savePromotionImageDto: SavePromotionImageDto){
    this.promotionService.deletePromotionImage(savePromotionImageDto.id).subscribe(() => {
      let promotionImageIndex = this.savePromotionImageDtos.indexOf(savePromotionImageDto);
      this.savePromotionImageDtos.splice(promotionImageIndex, 1);
    }, error => {});
  }

  customUploadItemToSavePromotionImageDto(customUploadItem: CustomUploadItem): SavePromotionImageDto{
    return {
      id: customUploadItem.id,
      index: customUploadItem.index,
      file: customUploadItem.file,
      fileName: customUploadItem.file.name,
      promotionId: this.promotion.id
    };
  }
}
