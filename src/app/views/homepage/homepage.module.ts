import {NgModule} from "@angular/core";
import {HomepageComponent} from "./homepage.component";
import {PromotionsCarouselModule} from "../../components/promotions-carousel/promotions-carousel.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HomepageComponent,
  ],
  exports: [
  ],
  imports: [
    PromotionsCarouselModule,
    CommonModule
  ]
})
export class HomepageModule { }
