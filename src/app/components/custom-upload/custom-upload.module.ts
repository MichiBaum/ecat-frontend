import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomUploadComponent } from './custom-upload.component';
import {ButtonModule, FileUploadModule, OrderListModule} from "primeng";
import {FileSizePipe} from "../../customPipes/file-size.pipe";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [CustomUploadComponent, FileSizePipe],
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
