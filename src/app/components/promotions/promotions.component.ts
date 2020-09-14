import {Component, OnInit} from '@angular/core';
import {Promotion} from "../../models/promotion";
import {PromotionService} from "../../services/promotion.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
  host: {
    class:'p-col'
  }
})
export class PromotionsComponent implements OnInit {

  promotions: Promotion[];
  newPromotions: Promotion[];
  normalPromotions: Promotion[];

  constructor(private promotionService: PromotionService, public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.promotionService.getPromotions().subscribe(promotions => {
      promotions.sort((a, b) => a.startDate > b.startDate ? 1 : -1);
      this.promotions = promotions;
      this.newPromotions = promotions.slice(0, 2);
      this.normalPromotions = promotions.slice(2);
    })
  }
  onDeletePromotion(promotionId: number){
    this.promotions.splice(this.promotions.findIndex(promotion => promotion.id == promotionId),1);
    this.newPromotions = this.promotions.slice(0, 2);
    this.normalPromotions = this.promotions.slice(2);
  }

}
