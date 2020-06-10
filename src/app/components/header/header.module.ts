import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header.component";
import {FormsModule} from "@angular/forms";
import {NavigationModule} from "../navigation/navigation.module";
import {ButtonModule, InputTextModule} from "primeng";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AdminEditorModule} from "../admin-editor/admin-editor.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent
  ],
    imports: [
        FormsModule,
        NavigationModule,
        ButtonModule,
        InputTextModule,
        RouterModule,
        CommonModule,
        AdminEditorModule,
        TranslateModule
    ]
})
export class HeaderModule { }
