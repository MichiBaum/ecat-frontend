import {NgModule} from "@angular/core";
import {PromotionCarouselCardComponent} from "./promotion-carousel-card.component";
import {CardModule, CarouselModule, ContextMenuModule} from "primeng";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    PromotionCarouselCardComponent,
  ],
  exports: [
    PromotionCarouselCardComponent
  ],
    imports: [
        CarouselModule,
        CommonModule,
        CardModule,
        ContextMenuModule
    ]
})
export class PromotionCarouselCardModule { }
