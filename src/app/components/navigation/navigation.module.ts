import {NgModule} from "@angular/core";
import {NavigationComponent} from "./navigation.component";
import {
    BreadcrumbModule,
    ButtonModule,
    InputTextModule,
    MegaMenuModule,
    SidebarModule,
    SlideMenuModule,
    TreeModule
} from "primeng";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {StickyfilldirectiveModule} from "../../directives/stickyfilldirective/stickyfilldirective.module";
import {CustomSlideMenuModule} from "../custom-slide-menu/custom-slide-menu.module";

@NgModule({
  declarations: [
    NavigationComponent,
  ],
  exports: [
    NavigationComponent
  ],
    imports: [
        ButtonModule,
        SidebarModule,
        TreeModule,
        InputTextModule,
        RouterModule,
        CommonModule,
        FormsModule,
        BreadcrumbModule,
        MegaMenuModule,
        SlideMenuModule,
        StickyfilldirectiveModule,
        CustomSlideMenuModule
    ]
})
export class NavigationModule { }
