import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
                              //  питання чи треба тут їх імпортувати?
import { OverlayService } from './shared/services/overlay/overlay.service';
import { ModalsService } from './shared/services/modals/modals.service';
import { PromotionService } from './shared/services/promotion/promotion.service';
import { ProductsService } from './shared/services/product/product.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PromotionComponent } from './pages/promotion/promotion.component';
import { PromotionInfoComponent } from './pages/promotion-info/promotion-info.component';
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
import { CarrouselAboutComponent } from './pages/about/carrousel-about/carrousel-about.component';
import { UserLoginModalComponent } from './modals/user-login-modal/user-login-modal.component';
import { DetailOrderComponent } from './modals/detail-order/detail-order.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';

import { AngularFireStorageModule } from '@angular/fire/compat/storage'; 
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'; 
import { provideStorage, getStorage } from '@angular/fire/storage'; 
import { environment } from '../environments/environment';

import { ToastrModule } from 'ngx-toastr';
import { ProductsComponent } from './pages/products/products.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PromotionComponent,
    PromotionInfoComponent,
    ProductsComponent,
    DeliveryPaymentComponent,
    AboutComponent,
    CallBackModalComponent,
    CartModalComponent,
    CarruselComponent,
    CarrouselAboutComponent,
    UserLoginModalComponent,
    DetailOrderComponent,
    ProductInfoComponent,
    TruncatePipe,

    AdminComponent,
    AdminPromotionComponent,
    AdminCategoriesComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    AngularFireStorageModule,
    ToastrModule.forRoot(),
  ],
  providers: [OverlayService, ModalsService, PromotionService, ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
