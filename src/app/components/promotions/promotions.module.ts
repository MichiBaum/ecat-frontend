import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PromotionsComponent} from "./promotions.component";
import {PromotionCardModule} from "../promotion-card/promotion-card.module";
import {PromotionEditorModule} from "../promotion-editor/promotion-editor.module";



@NgModule({
  declarations: [
    PromotionsComponent
  ],
  exports: [
    PromotionsComponent
  ],
    imports: [
        CommonModule,
        PromotionCardModule,
        PromotionEditorModule
    ]
})
export class PromotionsModule { }
