import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProductEditorComponent} from "./product-editor.component";
import {FormsModule} from "@angular/forms";
import {
  ConfirmDialogModule,
  DropdownModule,
  InputTextareaModule,
  InputTextModule
} from "primeng";

@NgModule({
  declarations: [
    ProductEditorComponent,
  ],
  exports: [
  ],
  imports: [
    DropdownModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    CommonModule,
    ConfirmDialogModule
  ]
})
export class ProductEditorModule { }
