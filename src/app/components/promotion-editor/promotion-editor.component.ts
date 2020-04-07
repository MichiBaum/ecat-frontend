import { Component, OnInit } from '@angular/core';
import {Promotion} from "../../models/promotion";
import {PromotionService} from "../../services/promotion.service";
import {ConfirmationService, MessageService, SelectItem} from "primeng";

@Component({
  selector: 'app-promotion-editor',
  templateUrl: './promotion-editor.component.html',
  styleUrls: ['./promotion-editor.component.scss']
})
export class PromotionEditorComponent implements OnInit {

  promotions: Promotion[] = [];
  promotionItems: SelectItem[] = [{label: 'New', value: {id: 0, title: '', description: '', startDate: null, endDate: null}}];
  selectedPromotion: Promotion = {id: 0, title: '', description: '', startDate: null, endDate: null};

  constructor(private promotionService: PromotionService, private confirmService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.promotionService.getPromotions().subscribe(data => {
      this.promotions = data;
      this.promotions.forEach(promotion => {
        this.promotionItems.push(this.convertPromotionToSelectItem(promotion));
      })
    },
      (error => {
        console.log(error.status);
      })
    );
  }

  savePromotion() {
    this.promotionService.savePromotion(this.selectedPromotion).subscribe(data => {
      if(this.selectedPromotion.id !== data.id){
        this.promotions.push(data);
        this.promotionItems.push(this.convertPromotionToSelectItem(data));
      } else {
        Object.assign(this.selectedPromotion, data);
      }
      this.selectedPromotion = {id: 0, title: '', description: '', startDate: null, endDate: null};
      this.promotionItems.find(item => item.value.id === data.id).label = data.title;
    },
      (error => {console.log(error.status)}))
  }

  deletePromotion(promotionId: number) {
    this.confirmService.confirm({
      message: 'Are you sure you want to delete this promotion',
      accept: () => {
        this.promotionService.deletePromotion(promotionId).subscribe(data => {
          this.selectedPromotion = {id: 0, title: '', description: '', startDate: null, endDate: null};
            this.promotionItems.splice(this.promotionItems.findIndex(item => item.value.id === promotionId), 1);
          },
          (error => {}));
      }
    })
  }

  resetFormToLastState() {}

  private convertPromotionToSelectItem(promotion: Promotion): SelectItem{
    return {
      label: promotion.title,
      value: promotion
    }
  }

  updateStartDate(date: Date){
    if(date){
      this.selectedPromotion.startDate = date.getTime();
    }else {
      this.messageService.add({severity: 'error', summary: 'Empty field', detail: 'No start date'});
    }
  }

  updateEndDate(date: Date){
    if(date){
      this.selectedPromotion.endDate = date.getTime();
    }else {
      this.messageService.add({severity: 'error', summary: 'Empty field', detail: 'No end date'});
    }
  }

}
