import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayService } from './shared/services/overlay.service';
import { ModalsService } from './shared/services/modals.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PromotionComponent } from './pages/promotion/promotion.component';
import { PromotionInfoComponent } from './pages/promotion-info/promotion-info.component';
import { RollsComponent } from './pages/product-category/rolls/rolls.component';
import { SetsComponent } from './pages/product-category/sets/sets.component';
import { DrinksComponent } from './pages/product-category/drinks/drinks.component';
import { SaucesComponent } from './pages/product-category/sauces/sauces.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { AboutComponent } from './pages/about/about.component';
import { CallBackModalComponent } from './modals/call-back-modal/call-back-modal.component';
import { CartModalComponent } from './modals/cart-modal/cart-modal.component';
import { AdminComponent } from './admin/admin.component';
import { AdminPromotionComponent } from './admin/admin-promotion/admin-promotion.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { CarruselComponent } from './pages/home/carrusel/carrusel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PromotionComponent,
    PromotionInfoComponent,
    RollsComponent,
    SetsComponent,
    DrinksComponent,
    SaucesComponent,
    DeliveryPaymentComponent,
    AboutComponent,
    CallBackModalComponent,
    CartModalComponent,
    AdminComponent,
    AdminPromotionComponent,
    AdminCategoriesComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    CarruselComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [OverlayService, ModalsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
