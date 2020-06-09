import {NgModule} from "@angular/core";
import {HomepageComponent} from "./homepage.component";
import {CommonModule} from "@angular/common";
import {PromotionsModule} from "../promotions/promotions.module";

@NgModule({
  declarations: [
    HomepageComponent,
  ],
  exports: [
  ],
    imports: [
        CommonModule,
        PromotionsModule
    ]
})
export class HomepageModule { }
