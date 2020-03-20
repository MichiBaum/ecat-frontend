import { Component, OnInit } from '@angular/core';
import {Promotion} from "../../classes/promotion";

@Component({
  selector: 'app-promotions-carousel',
  templateUrl: './promotions-carousel.component.html',
  styleUrls: ['./promotions-carousel.component.scss']
})
export class PromotionsCarouselComponent implements OnInit {
  promotions: Promotion[] = [];
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
    const promo1 = new Promotion('Promo 1', 'Description of Promo 1', 'Promo');
    const promo2 = new Promotion('Promo 2', 'Description of Promo 2', 'Promo');
    const promo3 = new Promotion('Promo 3', 'Description of Promo 3', 'Promo');
    const promo4 = new Promotion('Promo 4', 'Description of Promo 4', 'Promo');
    const promo5 = new Promotion('Promo 5', 'Description of Promo 5', 'Promo');
    const promo6 = new Promotion('Promo 6', 'Description of Promo 6', 'Promo');
    const promo7 = new Promotion('Promo 7', 'Description of Promo 7', 'Promo');
    const promo8 = new Promotion('Promo 8', 'Description of Promo 8', 'Promo');

    this.promotions.push(promo1, promo2, promo3, promo4, promo5, promo6, promo7, promo8);
  }

}
