import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CalendarModule, ConfirmationService, ConfirmDialogModule, MessageService, ToastModule} from "primeng";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomepageComponent } from './components/homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import {PromotionService} from "./services/promotion.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { PromotionEditorComponent } from './components/promotion-editor/promotion-editor.component';
import { LoginComponent } from './components/login/login.component';
import {httpInterceptProviders} from "./httpInterceptors/HttpInteceptProviders";
import {PermissionGuard} from "./guards/permission.guard";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DefaultErrorHandler} from "./errorHandlers/default-error-handler";
import {AuthErrorHandler} from "./errorHandlers/auth-error-handler";
import {LoginErrorHandler} from "./errorHandlers/login-error-handler";
import {ValidationErrorHandler} from "./errorHandlers/validation-error-handler";
import {InternalServerErrorHandler} from "./errorHandlers/internal-server-error-handler";
import { ProductEditorComponent } from './components/product-editor/product-editor.component';
import {FooterModule} from "./components/footer/footer.module";
import {HeaderModule} from "./components/header/header.module";
import {NavigationModule} from "./components/navigation/navigation.module";
import {ProductCardModule} from "./components/product-card/product-card.module";
import {PromotionCarouselModule} from "./components/promotion-carousel/promotion-carousel.module";
import {HomepageModule} from "./components/homepage/homepage.module";
import {LoginModule} from "./components/login/login.module";
import {ProductsModule} from "./components/products/products.module";
import {PromotionEditorModule} from "./components/promotion-editor/promotion-editor.module";
import {CommonModule} from "@angular/common";
import {ProductEditorModule} from "./components/product-editor/product-editor.module";
import {PromotionCarouselCardModule} from "./components/promotion-carousel-card/promotion-carousel-card.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

const appRoutes: Routes = [
  {path: "homepage", component: HomepageComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'admin/promotionEditor', component: PromotionEditorComponent, canActivate: [PermissionGuard], data: {requiredPermission: 'ADMINISTRATE'}},
  {path: 'admin/productEditor', component: ProductEditorComponent, canActivate: [PermissionGuard], data: {requiredPermission: 'ADMINISTRATE'}},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo:"/homepage"},
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
    PromotionCarouselModule,
    PromotionCarouselCardModule,
    HomepageModule,
    LoginModule,
    ProductsModule,
    PromotionEditorModule,
    ProductEditorModule,
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
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'de'
    })
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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
