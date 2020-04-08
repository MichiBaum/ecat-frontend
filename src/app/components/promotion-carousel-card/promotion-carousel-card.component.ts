import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Promotion} from "../../models/promotion";
import {MenuItem} from "primeng";
import {AuthenticationService} from "../../services/authentication.service";
import {PromotionService} from "../../services/promotion.service";

@Component({
  selector: 'app-promotions-carousel-card',
  templateUrl: './promotion-carousel-card.component.html',
  styleUrls: ['./promotion-carousel-card.component.scss']
})
export class PromotionCarouselCardComponent implements OnInit {

  @Input() public promotion: Promotion;
  @Output() deletePromotion = new EventEmitter();
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
        command: () => {
          this.promotionService.deletePromotion(this.promotion.id).subscribe(() => {
              this.deletePromotion.emit(this.promotion.id);
            },
            (error => {}))
        }
      }
    ]
  }

}
