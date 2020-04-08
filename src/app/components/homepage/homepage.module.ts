import {NgModule} from "@angular/core";
import {HomepageComponent} from "./homepage.component";
import {PromotionCarouselModule} from "../promotion-carousel/promotion-carousel.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HomepageComponent,
  ],
  exports: [
  ],
  imports: [
    PromotionCarouselModule,
    CommonModule
  ]
})
export class HomepageModule { }
