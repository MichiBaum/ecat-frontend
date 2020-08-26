import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomSlideMenuComponent, CustomSlideMenuSubComponent} from "./custom-slide-menu.component";



@NgModule({
  declarations: [CustomSlideMenuComponent, CustomSlideMenuSubComponent],
  imports: [
    CommonModule
  ],
  exports: [CustomSlideMenuComponent, CustomSlideMenuSubComponent]
})
export class CustomSlideMenuModule { }
