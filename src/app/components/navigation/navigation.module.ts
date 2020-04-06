import {NgModule} from "@angular/core";
import {NavigationComponent} from "./navigation.component";
import {ButtonModule, InputTextModule, SidebarModule, TreeModule} from "primeng";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

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
    CommonModule
  ]
})
export class NavigationModule { }
