import {NgModule} from "@angular/core";
import {ProductsComponent} from "./products.component";
import {ProductCardModule} from "../product-card/product-card.module";
import {CommonModule} from "@angular/common";
import {ProductEditorModule} from "../product-editor/product-editor.module";
import {ConfirmDialogModule} from "primeng";

@NgModule({
  declarations: [
    ProductsComponent,
  ],
    exports: [
        ProductsComponent
    ],
    imports: [
        ProductCardModule,
        CommonModule,
        ProductEditorModule,
        ConfirmDialogModule
    ]
})
export class ProductsModule { }
