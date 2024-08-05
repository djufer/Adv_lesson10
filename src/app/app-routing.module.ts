import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { HomeComponent } from './pages/home/home.component';
import { PromotionComponent } from './pages/promotion/promotion.component';
import { PromotionInfoComponent } from './pages/promotion-info/promotion-info.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';

import { AdminComponent } from './admin/admin.component';
import { AdminPromotionComponent } from './admin/admin-promotion/admin-promotion.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { productInfoResolver } from './shared/services/product/product-info.resolver';
import { promotionInfoResolver } from './shared/services/promotion/promotion-info.resolver';
import { authAdminGuard, authUserGuard } from './shared/guards/auth/auth.guard';

import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { OrderHistoryComponent } from './pages/cabinet/order-history/order-history.component';
import { PersonalDataComponent } from './pages/cabinet/personal-data/personal-data.component';
import { DeliveryAddressesComponent } from './pages/cabinet/delivery-addresses/delivery-addresses.component';
import { NotificationsComponent } from './pages/cabinet/notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    data: { breadcrumb: 'Home' },
  },
  { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'promotion',
    component: PromotionComponent,
    data: { breadcrumb: 'Promotion' },
  },
  {
    path: 'promotion/:id',
    component: PromotionInfoComponent,
    resolve: {
      promotionInfo: promotionInfoResolver,
    },
    data: { breadcrumb: 'Promotion Info' },
  },
  {
    path: 'products/:category',
    component: ProductsComponent,
    data: { breadcrumb: 'Products' },
  },
  {
    path: 'products/:category/:id',
    component: ProductInfoComponent,
    resolve: { productInfo: productInfoResolver },
    data: { breadcrumb: 'Product Info' } },
  { path: 'delivery-payment', component: DeliveryPaymentComponent, data: { breadcrumb: 'Delivery' } },
  { path: 'about', component: AboutComponent, data: { breadcrumb: 'About' } },
  { path: 'auth', component: AuthorizationComponent, data: { breadcrumb: 'auth' } },
  { path: 'cabinet', component: CabinetComponent, canActivate: [authUserGuard], data: { breadcrumb: 'cabinet' },
    children: [
      { path: '', redirectTo: 'personal-data', pathMatch: 'full' },
      { path: 'personal-data', component: PersonalDataComponent },
      { path: 'order-history', component: OrderHistoryComponent },
      { path: 'delivery-addresses', component: DeliveryAddressesComponent },
      { path: 'notifications', component: NotificationsComponent },
    ],
  },
  {
    path: 'admin',
    canActivate: [authAdminGuard],
    data: { breadcrumb: 'Admin' },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
