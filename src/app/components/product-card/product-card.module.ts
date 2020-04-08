import {NgModule} from "@angular/core";
import {ProductCardComponent} from "./product-card.component";
import {CardModule, ContextMenuModule} from "primeng";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProductCardComponent,
  ],
  exports: [
    ProductCardComponent
  ],
    imports: [
        CardModule,
        CommonModule,
        FormsModule,
        ContextMenuModule
    ]
})
export class ProductCardModule { }
