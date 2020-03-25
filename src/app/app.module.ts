import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {
  ButtonModule, CalendarModule,
  CardModule,
  CarouselModule, DropdownModule, InputTextareaModule,
  InputTextModule,
  MegaMenuModule, MessageService,
  SidebarModule, ToastModule,
  TreeModule
} from "primeng";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PromotionsCarouselComponent } from './components/promotions-carousel/promotions-carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './views/products/products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import {PromotionService} from "./services/promotion.service";
import {HttpClientModule} from "@angular/common/http";
import { PromotionEditorComponent } from './views/promotion-editor/promotion-editor.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './views/login/login.component';
import {httpInterceptProviders} from "./httpInterceptors/HttpInteceptProviders";
import {PermissionGuard} from "./guards/permission.guard";

const appRoutes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: HomepageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    PromotionsCarouselComponent,
    FooterComponent,
    HomepageComponent,
    ProductsComponent,
    ProductCardComponent,
    PromotionEditorComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    SidebarModule,
    TreeModule,
    InputTextModule,
    BrowserAnimationsModule,
    CarouselModule,
    CardModule,
    RouterModule.forRoot(
      appRoutes
    ),
    MegaMenuModule,
    HttpClientModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextareaModule,
    CalendarModule,
    ToastModule,
  ],
  providers: [
    PromotionService,
    HttpClientModule,
    MessageService,
    httpInterceptProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
