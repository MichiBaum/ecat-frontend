import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PromotionsComponent} from "./promotions.component";
import {PromotionCardModule} from "../promotion-card/promotion-card.module";
import {PromotionEditorModule} from "../promotion-editor/promotion-editor.module";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonModule} from "primeng";



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
    PromotionEditorModule,
    TranslateModule,
    ButtonModule
  ]
})
export class PromotionsModule { }
