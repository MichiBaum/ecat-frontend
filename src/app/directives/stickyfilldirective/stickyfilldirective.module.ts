import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StickyfillDirective} from "./stickyfill.directive";



@NgModule({
  declarations: [
    StickyfillDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StickyfillDirective
  ]
})
export class StickyfilldirectiveModule { }
