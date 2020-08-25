import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MillisecondDatePipe} from "./mili-date.pipe";



@NgModule({
  declarations: [
    MillisecondDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MillisecondDatePipe
  ]
})
export class MilliDatePipeModule { }
