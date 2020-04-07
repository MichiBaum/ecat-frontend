import {NgModule} from "@angular/core";
import {ProductsComponent} from "./products.component";
import {ProductCardModule} from "../product-card/product-card.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    ProductsComponent,
  ],
  exports: [
  ],
  imports: [
    ProductCardModule,
    CommonModule
  ]
})
export class ProductsModule { }
