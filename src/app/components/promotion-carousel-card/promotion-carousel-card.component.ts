import {Component, Input, OnInit} from '@angular/core';
import {Promotion} from "../../models/promotion";

@Component({
  selector: 'app-promotions-carousel-card',
  templateUrl: './promotion-carousel-card.component.html',
  styleUrls: ['./promotion-carousel-card.component.scss']
})
export class PromotionCarouselCardComponent implements OnInit {

  @Input() public promotion: Promotion;

  constructor() { }

  ngOnInit(): void {
  }

}
