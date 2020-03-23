import {Component, Input, OnInit} from '@angular/core';
import {Promotion} from "../../classes/promotion";

@Component({
  selector: 'app-promotions-carousel',
  templateUrl: './promotions-carousel.component.html',
  styleUrls: ['./promotions-carousel.component.scss']
})
export class PromotionsCarouselComponent implements OnInit {
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

}
