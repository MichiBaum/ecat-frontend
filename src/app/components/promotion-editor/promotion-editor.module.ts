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
import {MillisecondDatePipe} from "../../customPipes/mili-date.pipe";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    PromotionEditorComponent,
    MillisecondDatePipe
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
        FileUploadModule
    ]
})
export class PromotionEditorModule { }
