import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProductEditorComponent} from "./product-editor.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
    InputTextareaModule,
    InputTextModule,
    CommonModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductEditorModule { }
