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
import {CustomSlideMenuModule} from "../custom-slidemenu/custom-slide-menu.component";
import {StickyfilldirectiveModule} from "../../directives/stickyfilldirective/stickyfilldirective.module";

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
    CustomSlideMenuModule,
    StickyfilldirectiveModule
  ]
})
export class NavigationModule { }
