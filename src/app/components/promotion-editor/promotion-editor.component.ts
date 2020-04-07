import { Component, OnInit } from '@angular/core';
import {Promotion} from "../../models/promotion";
import {PromotionService} from "../../services/promotion.service";
import {ConfirmationService, MessageService, SelectItem} from "primeng";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-promotion-editor',
  templateUrl: './promotion-editor.component.html',
  styleUrls: ['./promotion-editor.component.scss']
})
export class PromotionEditorComponent implements OnInit {

  promotionItems: SelectItem[] = [{label: 'New', value: {id: 0, title: '', description: '', startDate: null, endDate: null}}];
  selectedPromotion: Promotion = {id: 0, title: '', description: '', startDate: null, endDate: null};

  promotionForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  constructor(private promotionService: PromotionService, private confirmService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.promotionService.getPromotions().subscribe(data => {
      data.forEach(promotion => {
        this.promotionItems.push(this.convertPromotionToSelectItem(promotion));
      })
    },
      (error => {
        console.log(error.status);
      })
    );
  }
  updateForm(){
    this.promotionForm.patchValue(this.selectedPromotion);
  }
  savePromotion() {
    this.promotionService.savePromotion(this.promotionForm.getRawValue()).subscribe(data => {
      if(this.selectedPromotion.id !== data.id){
        this.promotionItems.push(this.convertPromotionToSelectItem(data));
      } else {
        Object.assign(this.selectedPromotion, data);
      }
      this.selectedPromotion = {id: 0, title: '', description: '', startDate: null, endDate: null};
      this.promotionItems.find(item => item.value.id === data.id).label = data.title;
      this.updateForm();
    },
      (error => {}))
  }

  deletePromotion(promotionId: number) {
    this.confirmService.confirm({
      message: 'Are you sure you want to delete this promotion',
      accept: () => {
        this.promotionService.deletePromotion(promotionId).subscribe(data => {
          this.selectedPromotion = {id: 0, title: '', description: '', startDate: null, endDate: null};
          this.promotionItems.splice(this.promotionItems.findIndex(item => item.value.id === promotionId), 1);
          this.updateForm();
          },
          (error => {}));
      }
    })
  }

  resetFormToLastState() {
    this.promotionForm.patchValue(this.selectedPromotion);
  }

  private convertPromotionToSelectItem(promotion: Promotion): SelectItem{
    return {
      label: promotion.title,
      value: promotion
    }
  }

  updateStartDate(date: Date){
    console.log(date);
    if(date){
      this.promotionForm.controls['startDate'].setValue(date.getTime());
    }else {
      this.messageService.add({severity: 'error', summary: 'Empty field', detail: 'No start date'});
    }
  }

  updateEndDate(date: Date){
    console.log(date);
    if(date){
      this.promotionForm.controls['endDate'].setValue(date.getTime());
    }else {
      this.messageService.add({severity: 'error', summary: 'Empty field', detail: 'No end date'});
    }
  }

}
