import {NgModule} from "@angular/core";
import {FooterComponent} from "./footer.component";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    FooterComponent,
  ],
  exports: [
    FooterComponent
  ],
    imports: [
        CommonModule,
        TranslateModule
    ]
})
export class FooterModule { }
