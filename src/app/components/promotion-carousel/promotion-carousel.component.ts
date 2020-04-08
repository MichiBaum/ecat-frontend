import {Component, Input, OnInit} from '@angular/core';
import {Promotion} from "../../models/promotion";
import {AuthenticationService} from "../../services/authentication.service";
import {MenuItem} from "primeng";
import {PromotionService} from "../../services/promotion.service";

@Component({
  selector: 'app-promotions-carousel',
  templateUrl: './promotion-carousel.component.html',
  styleUrls: ['./promotion-carousel.component.scss']
})
export class PromotionCarouselComponent implements OnInit {

  @Input() promotions: Promotion[] = [];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }
  onDeletePromotion(promotionId: number){
    this.promotions.splice(this.promotions.findIndex(promotion => promotion.id == promotionId),1);
  }
}
