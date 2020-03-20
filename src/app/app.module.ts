import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {
  ButtonModule,
  CardModule,
  CarouselModule,
  InputTextModule,
  MegaMenuModule,
  SidebarModule,
  TreeModule
} from "primeng";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PromotionsCarouselComponent } from './components/promotions-carousel/promotions-carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './views/products/products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

const appRoutes: Routes = [
  {path: 'products', component: ProductsComponent},
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
    MegaMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
