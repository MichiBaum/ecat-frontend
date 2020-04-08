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

  promotionContextItems: MenuItem[];

  constructor(public authService: AuthenticationService, private promotionService: PromotionService) { }

  ngOnInit(): void {
    this.promotionContextItems = [
      {
        label: "Neu",
        routerLink: "../admin/promotionEditor"
      },
      {
        label: "Bearbeiten",
        routerLink: "../admin/promotionEditor"
      },
      {
        label: "Löschen",
        routerLink: "../admin/promotionEditor"
      }
    ]
  }

}
