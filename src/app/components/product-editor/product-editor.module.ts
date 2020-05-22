import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProductEditorComponent} from "./product-editor.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    ConfirmDialogModule, DialogModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule
} from "primeng";

@NgModule({
  declarations: [
    ProductEditorComponent,
  ],
  exports: [
    ProductEditorComponent
  ],
    imports: [
        DropdownModule,
        InputTextareaModule,
        InputTextModule,
        CommonModule,
        ConfirmDialogModule,
        ReactiveFormsModule,
        FormsModule,
        DialogModule
    ]
})
export class ProductEditorModule { }
