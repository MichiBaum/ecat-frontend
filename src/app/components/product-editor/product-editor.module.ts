import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProductEditorComponent} from "./product-editor.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    ConfirmDialogModule, DialogModule,
    DropdownModule, FileUploadModule,
    InputTextareaModule,
    InputTextModule
} from "primeng";
import {TranslateModule} from "@ngx-translate/core";
import {CustomUploadModule} from "../custom-upload/custom-upload.module";

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
        DialogModule,
        TranslateModule,
        FileUploadModule,
        CustomUploadModule
    ]
})
export class ProductEditorModule { }
