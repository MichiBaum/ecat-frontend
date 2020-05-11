import { Component, OnInit } from '@angular/core';
import {Promotion} from "../../models/promotion";
import {PromotionService} from "../../services/promotion.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  host: {
    class:'p-col'
  }
})
export class HomepageComponent implements OnInit {

  promotions: Promotion[];

  constructor(private promotionService: PromotionService) { }

  ngOnInit(): void {
    this.promotionService.getPromotions().subscribe(data => {
        this.promotions = data;
      }
    )
  }

}
