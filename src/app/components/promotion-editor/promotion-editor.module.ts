import {NgModule} from "@angular/core";
import {PromotionEditorComponent} from "./promotion-editor.component";
import {
    CalendarModule,
    DialogModule,
    DropdownModule, FileUploadModule,
    InputTextareaModule,
    InputTextModule
} from "primeng";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {CustomUploadModule} from "../custom-upload/custom-upload.module";
import {MilliDatePipeModule} from "../../customPipes/milliDatePipe/milli-date-pipe.module";

@NgModule({
  declarations: [
    PromotionEditorComponent,
  ],
    exports: [
        PromotionEditorComponent
    ],
    imports: [
        DropdownModule,
        FormsModule,
        CalendarModule,
        InputTextareaModule,
        InputTextModule,
        CommonModule,
        ReactiveFormsModule,
        DialogModule,
        TranslateModule,
        FileUploadModule,
        CustomUploadModule,
        MilliDatePipeModule
    ]
})
export class PromotionEditorModule { }
