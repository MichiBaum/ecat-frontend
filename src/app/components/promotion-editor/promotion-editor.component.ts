import { Component } from '@angular/core';
import {Promotion} from "../../models/promotion";
import {PromotionService} from "../../services/promotion.service";
import {MessageService} from "primeng";
import {FormControl, FormGroup} from "@angular/forms";
import {PromotionEditorService} from "../../services/promotion-editor.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-promotion-editor',
  templateUrl: './promotion-editor.component.html',
  styleUrls: ['./promotion-editor.component.scss']
})
export class PromotionEditorComponent{

  promotion: Promotion = {id: 0, title: '', description: '', startDate: null, endDate: null};
  showDialog: boolean = false;

  promotionForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    image: new FormControl()
  });

  constructor(private promotionService: PromotionService,
              private messageService: MessageService,
              private promotionEditorService: PromotionEditorService,
              private translateService: TranslateService
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
  updateImage(event){
    this.promotionForm.get('image').setValue(event.files[0]);
  }
  savePromotion() {
    this.promotionService.savePromotion(this.promotionForm.getRawValue()).subscribe(data => {
      Object.assign(this.promotion, data);
      this.messageService.add({severity: 'success', summary: this.translateService.instant('toastMessages.success'), detail: this.translateService.instant('promotionEditor.successfulSave')});
      const formData = new FormData();
      formData.append('image', this.promotionForm.get('image').value);
      this.promotionService.savePromotionImage(formData, data.id).subscribe(() => {
          this.messageService.add({severity:'success', summary:this.translateService.instant('toastMessages.success'), detail:this.translateService.instant('promotionEditor.successfulImageSave')});
        },
        (error => {}))
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

}
