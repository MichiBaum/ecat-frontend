import {NgModule} from "@angular/core";
import {ProductCardComponent} from "./product-card.component";
import {ButtonModule, CardModule, ContextMenuModule} from "primeng";
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
        ContextMenuModule,
        ButtonModule
    ]
})
export class ProductCardModule { }
