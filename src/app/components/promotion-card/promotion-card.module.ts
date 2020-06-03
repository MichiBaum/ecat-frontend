import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PromotionCardComponent} from "./promotion-card.component";
import {ButtonModule, CardModule, ContextMenuModule} from "primeng";



@NgModule({
  declarations: [
    PromotionCardComponent
  ],
  exports: [
    PromotionCardComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ContextMenuModule
  ]
})
export class PromotionCardModule { }
