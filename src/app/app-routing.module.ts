import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { HomeComponent } from './pages/home/home.component';
import { PromotionComponent } from './pages/promotion/promotion.component';
import { PromotionInfoComponent } from './pages/promotion-info/promotion-info.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';


import { AdminComponent } from './admin/admin.component';
import { AdminPromotionComponent } from './admin/admin-promotion/admin-promotion.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { productInfoResolver } from './shared/services/product/product-info.resolver';
import { promotionInfoResolver } from './shared/services/promotion/promotion-info.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'promotion', component: PromotionComponent },
  {
    path: 'promotion/:id',
    component: PromotionInfoComponent,
    resolve: {
      promotionInfo: promotionInfoResolver,
    },
  },
  { path: 'products/:category', component: ProductsComponent },
  {
    path: 'products/:category/:id',
    component: ProductInfoComponent,
    resolve: {
      productInfo: productInfoResolver,
    },
  },
  { path: 'delivery-payment', component: DeliveryPaymentComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'actions', pathMatch: 'full' },
      { path: 'actions', component: AdminPromotionComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'orders', component: AdminOrdersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {  }
