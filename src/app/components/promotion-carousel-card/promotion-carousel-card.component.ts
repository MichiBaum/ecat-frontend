import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Promotion} from "../../models/promotion";
import {MenuItem} from "primeng";
import {AuthenticationService} from "../../services/authentication.service";
import {PromotionService} from "../../services/promotion.service";
import {PromotionEditorService} from "../../services/promotion-editor.service";

@Component({
  selector: 'app-promotions-carousel-card',
  templateUrl: './promotion-carousel-card.component.html',
  styleUrls: ['./promotion-carousel-card.component.scss']
})
export class PromotionCarouselCardComponent implements OnInit {

  @Input() public promotion: Promotion;
  @Output() deletePromotion = new EventEmitter();
  promotionContextItems: MenuItem[];

  constructor(private authService: AuthenticationService,
              private promotionService: PromotionService,
              private promotionEditorService: PromotionEditorService
  ) { }

  ngOnInit(): void {
    this.promotionContextItems = [
      {
        label: "Neu",
        command: () => {
          this.promotionEditorService.editPromotion({id: 0, title: '', description: '', pictureName: '', startDate: Date.now(), endDate: Date.now()});
        }
      },
      {
        label: "Bearbeiten",
        command: () => {
          this.promotionEditorService.editPromotion(this.promotion);
        }
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
