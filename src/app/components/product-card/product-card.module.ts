import {NgModule} from "@angular/core";
import {ProductCardComponent} from "./product-card.component";
import {ButtonModule, CardModule, ConfirmDialogModule, ContextMenuModule, ProgressSpinnerModule} from "primeng";
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
        ButtonModule,
        ConfirmDialogModule,
        ProgressSpinnerModule
    ]
})
export class ProductCardModule { }
