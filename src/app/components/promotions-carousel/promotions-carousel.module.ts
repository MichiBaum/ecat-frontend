import {NgModule} from "@angular/core";
import {PromotionsCarouselComponent} from "./promotions-carousel.component";
import {CarouselModule} from "primeng";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    PromotionsCarouselComponent,
  ],
  exports: [
    PromotionsCarouselComponent
  ],
  imports: [
    CarouselModule,
    CommonModule
  ]
})
export class PromotionsCarouselModule { }
