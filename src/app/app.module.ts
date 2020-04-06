import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {
  ButtonModule, CalendarModule,
  CardModule,
  CarouselModule, ConfirmationService, ConfirmDialogModule, DropdownModule, InputTextareaModule,
  InputTextModule,
  MegaMenuModule, MessageService, PasswordModule,
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
import { LoginComponent } from './views/login/login.component';
import {httpInterceptProviders} from "./httpInterceptors/HttpInteceptProviders";
import {PermissionGuard} from "./guards/permission.guard";
import { MillisecondDatePipe } from './customPipes/mili-date.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DefaultErrorHandler} from "./errorHandlers/default-error-handler";
import {AuthErrorHandler} from "./errorHandlers/auth-error-handler";
import {LoginErrorHandler} from "./errorHandlers/login-error-handler";
import {ValidationErrorHandler} from "./errorHandlers/validation-error-handler";
import {InternalServerErrorHandler} from "./errorHandlers/internal-server-error-handler";
import {FooterModule} from "./components/footer/footer.module";
import {HeaderModule} from "./components/header/header.module";
import {NavigationModule} from "./components/navigation/navigation.module";
import {ProductCardModule} from "./components/product-card/product-card.module";
import {PromotionsCarouselModule} from "./components/promotions-carousel/promotions-carousel.module";
import {HomepageModule} from "./views/homepage/homepage.module";
import {LoginModule} from "./views/login/login.module";
import {ProductsModule} from "./views/products/products.module";
import {PromotionEditorModule} from "./views/promotion-editor/promotion-editor.module";
import {CommonModule} from "@angular/common";

const appRoutes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'admin/promotionEditor', component: PromotionEditorComponent, canActivate: [PermissionGuard], data: {requiredPermission: 'ADMINISTRATE'}},
  {path: 'login', component: LoginComponent},
  {path: '**', component: HomepageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterModule,
    HeaderModule,
    NavigationModule,
    ProductCardModule,
    PromotionsCarouselModule,
    HomepageModule,
    LoginModule,
    ProductsModule,
    PromotionEditorModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    CalendarModule,
    ToastModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    PromotionService,
    HttpClientModule,
    MessageService,
    httpInterceptProviders,
    ConfirmationService,
    DefaultErrorHandler,
    AuthErrorHandler,
    LoginErrorHandler,
    ValidationErrorHandler,
    InternalServerErrorHandler
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
