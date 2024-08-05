import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

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

import { CarruselComponent } from './pages/home/carrusel/carrusel.component';
import { CarrouselAboutComponent } from './pages/about/carrousel-about/carrousel-about.component';
import { UserLoginModalComponent } from './modals/user-login-modal/user-login-modal.component';
import { DetailOrderComponent } from './modals/detail-order/detail-order.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { ToastrModule } from 'ngx-toastr';
import { ProductsComponent } from './pages/products/products.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { OrderHistoryComponent } from './pages/cabinet/order-history/order-history.component';
import { PersonalDataComponent } from './pages/cabinet/personal-data/personal-data.component';
import { DeliveryAddressesComponent } from './pages/cabinet/delivery-addresses/delivery-addresses.component';
import { NotificationsComponent } from './pages/cabinet/notifications/notifications.component';

import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { SharedModule } from './shared/shared.module';





@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PromotionComponent,
    PromotionInfoComponent,
    ProductsComponent,
    ProductInfoComponent,
    DeliveryPaymentComponent,
    CallBackModalComponent,
    CartModalComponent,
    CarruselComponent,
    CarrouselAboutComponent,
    UserLoginModalComponent,
    DetailOrderComponent,
    BreadcrumbsComponent,


    CabinetComponent,
    OrderHistoryComponent,
    PersonalDataComponent,
    DeliveryAddressesComponent,
    NotificationsComponent,
    AuthDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    AngularFireStorageModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
