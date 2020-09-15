import {Component, ViewChild} from '@angular/core';
import {Promotion} from "../../models/promotion";
import {PromotionService} from "../../services/promotion.service";
import {Calendar, MessageService} from "primeng";
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

  @ViewChild('calendar1') calendar1: Calendar;
  @ViewChild('calendar2') calendar2: Calendar;
  promotion: Promotion = {id: 0, title: '', description: '', startDate: null, endDate: null};
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
      if(!promotion.returnPromotionImageDtos){
        this.promotion.returnPromotionImageDtos = [];
      }
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
    this.promotionService.savePromotion(this.promotionForm.getRawValue()).subscribe(promotion => {
      Object.assign(this.promotion, promotion);
      this.messageService.add({
        severity:'success',
        summary:this.translateService.instant('toastMessages.success'),
        detail:this.translateService.instant('promotionEditor.successfulSave')
      });
      this.updateForm();
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

  updatePromotionImagesIndex(updatedIndexes: any){
    for (let [key, value] of updatedIndexes){
      let returnPromotionImageDto = this.promotion.returnPromotionImageDtos.find(returnPromotionImageDtoPredicate => returnPromotionImageDtoPredicate.id == key);
      this.promotionService.savePromotionImageIndex(returnPromotionImageDto.id, value).subscribe(() => {}, error => {});
    }
  }

  saveNewPromotionImage(savePromotionImageDto: SavePromotionImageDto){
    this.promotionService.savePromotionImage(savePromotionImageDto).subscribe(returnPromotionImageDto => {
        if(savePromotionImageDto.id && returnPromotionImageDto.id !== 0){
          let originalReturnPromotionImageDto = this.promotion.returnPromotionImageDtos.find(
            returnPromotionImageDtoPredicate => returnPromotionImageDtoPredicate.id === savePromotionImageDto.id);
          Object.assign(originalReturnPromotionImageDto, returnPromotionImageDto);
        }else {
          this.promotion.returnPromotionImageDtos.push(returnPromotionImageDto);
        }
      }, error => {})
  }

  deletePromotionImage(id: number){
    this.promotionService.deletePromotionImage(id).subscribe(() => {
      let returnPromotionImageDtoIndex = this.promotion.returnPromotionImageDtos.findIndex(
        returnPromotionImageDtoPredicate => returnPromotionImageDtoPredicate.id === id);
      this.promotion.returnPromotionImageDtos.splice(returnPromotionImageDtoIndex, 1);
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
  hideCalendars(){
    this.calendar1.hideOverlay();
    this.calendar2.hideOverlay();
  }
}
