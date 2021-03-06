import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CalendarModule, ConfirmationService, ConfirmDialogModule, MessageService, ToastModule} from "primeng";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import {PromotionService} from "./services/promotion.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import {httpInterceptProviders} from "./httpInterceptors/HttpInteceptProviders";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DefaultErrorHandler} from "./errorHandlers/default-error-handler";
import {AuthErrorHandler} from "./errorHandlers/auth-error-handler";
import {ValidationErrorHandler} from "./errorHandlers/validation-error-handler";
import {InternalServerErrorHandler} from "./errorHandlers/internal-server-error-handler";
import {FooterModule} from "./components/footer/footer.module";
import {HeaderModule} from "./components/header/header.module";
import {NavigationModule} from "./components/navigation/navigation.module";
import {ProductCardModule} from "./components/product-card/product-card.module";
import {LoginModule} from "./components/login/login.module";
import {ProductsModule} from "./components/products/products.module";
import {PromotionEditorModule} from "./components/promotion-editor/promotion-editor.module";
import {CommonModule} from "@angular/common";
import {ProductEditorModule} from "./components/product-editor/product-editor.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NotFoundErrorHandler} from "./errorHandlers/not-found-error-handler";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {CustomUploadModule} from "./components/custom-upload/custom-upload.module";
import {PromotionsComponent} from "./components/promotions/promotions.component";
import {PromotionsModule} from "./components/promotions/promotions.module";
import {StickyfilldirectiveModule} from "./directives/stickyfilldirective/stickyfilldirective.module";

const appRoutes: Routes = [
  {path: 'homepage', component: PromotionsComponent},
  {path: 'products/:productGroup/:productClass/:productFamily', component: ProductsComponent},
  {path: 'products/:productGroup/:productClass', component: ProductsComponent},
  {path: 'products/:productGroup', component: ProductsComponent},
  {path: 'search/:searchText', component: ProductsComponent},
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
    PromotionsModule,
    NavigationModule,
    ProductCardModule,
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
    }),
    FontAwesomeModule,
    CustomUploadModule,
    StickyfilldirectiveModule
  ],
  providers: [
    PromotionService,
    HttpClientModule,
    MessageService,
    httpInterceptProviders,
    ConfirmationService,
    DefaultErrorHandler,
    AuthErrorHandler,
    ValidationErrorHandler,
    InternalServerErrorHandler,
    NotFoundErrorHandler
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
