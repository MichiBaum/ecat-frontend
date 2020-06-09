import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminEditorComponent} from "./admin-editor.component";
import {ButtonModule, DialogModule, DropdownModule, InputTextModule, MultiSelectModule} from "primeng";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AdminEditorComponent
  ],
  exports:[
    AdminEditorComponent
  ],
  imports: [
    CommonModule,
    MultiSelectModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    InputTextModule
  ]
})
export class AdminEditorModule { }
