import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomUploadComponent } from './custom-upload.component';
import {ButtonModule, FileUploadModule, OrderListModule} from "primeng";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [CustomUploadComponent],
  exports: [
    CustomUploadComponent
  ],
    imports: [
        CommonModule,
        ButtonModule,
        OrderListModule,
        FileUploadModule,
        TranslateModule,
    ]
})
export class CustomUploadModule { }
