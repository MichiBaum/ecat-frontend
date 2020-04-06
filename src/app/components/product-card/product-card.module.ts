import {NgModule} from "@angular/core";
import {ProductCardComponent} from "./product-card.component";
import {CardModule} from "primeng";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    ProductCardComponent,
  ],
  exports: [
    ProductCardComponent
  ],
  imports: [
    CardModule,
    CommonModule
  ]
})
export class ProductCardModule { }
