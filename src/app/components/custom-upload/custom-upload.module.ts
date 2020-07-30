import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomUploadComponent } from './custom-upload.component';
import {ButtonModule, FileUploadModule, OrderListModule} from "primeng";
import {FileSizePipe} from "../../customPipes/file-size.pipe";



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
  ]
})
export class CustomUploadModule { }
