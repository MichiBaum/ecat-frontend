import {NgModule} from "@angular/core";
import {HomepageComponent} from "./homepage.component";
import {PromotionCarouselModule} from "../promotion-carousel/promotion-carousel.module";
import {CommonModule} from "@angular/common";
import {PromotionsModule} from "../promotions/promotions.module";

@NgModule({
  declarations: [
    HomepageComponent,
  ],
  exports: [
  ],
    imports: [
        PromotionCarouselModule,
        CommonModule,
        PromotionsModule
    ]
})
export class HomepageModule { }
