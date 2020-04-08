import {NgModule} from "@angular/core";
import {PromotionCarouselComponent} from "./promotion-carousel.component";
import {CardModule, CarouselModule, ContextMenuModule} from "primeng";
import {CommonModule} from "@angular/common";
import {PromotionCarouselCardModule} from "../promotion-carousel-card/promotion-carousel-card.module";

@NgModule({
  declarations: [
    PromotionCarouselComponent,
  ],
  exports: [
    PromotionCarouselComponent
  ],
  imports: [
    CarouselModule,
    CommonModule,
    CardModule,
    ContextMenuModule,
    PromotionCarouselCardModule
  ]
})
export class PromotionCarouselModule { }
