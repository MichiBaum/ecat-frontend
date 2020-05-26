import {NgModule} from "@angular/core";
import {PromotionEditorComponent} from "./promotion-editor.component";
import {
  CalendarModule,
  ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  InputTextareaModule,
  InputTextModule
} from "primeng";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MillisecondDatePipe} from "../../customPipes/mili-date.pipe";
import {CommonModule} from "@angular/common";

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
    ConfirmDialogModule,
    InputTextareaModule,
    InputTextModule,
    CommonModule,
    ReactiveFormsModule,
    DialogModule
  ]
})
export class PromotionEditorModule { }
