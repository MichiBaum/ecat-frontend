import {NgModule} from "@angular/core";
import {PromotionEditorComponent} from "./promotion-editor.component";
import {CalendarModule, ConfirmDialogModule, DropdownModule, InputTextareaModule, InputTextModule} from "primeng";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MillisecondDatePipe} from "../../customPipes/mili-date.pipe";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    PromotionEditorComponent,
    MillisecondDatePipe
  ],
  exports: [
  ],
  imports: [
    DropdownModule,
    FormsModule,
    CalendarModule,
    ConfirmDialogModule,
    InputTextareaModule,
    InputTextModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PromotionEditorModule { }
