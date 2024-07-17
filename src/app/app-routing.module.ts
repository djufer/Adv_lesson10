import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    resolve: {
      productInfo: productInfoResolver,
    },
    data: { breadcrumb: 'Product Info' },
  },
  {
    path: 'delivery-payment',
    component: DeliveryPaymentComponent,
    data: { breadcrumb: 'Delivery' },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { breadcrumb: 'About' },
  },
  {
    path: 'auth',
    component: AuthorizationComponent,
    data: { breadcrumb: 'auth' },
  },
  {
    path: 'cabinet',
    component: CabinetComponent,
    canActivate: [authUserGuard],
    data: { breadcrumb: 'cabinet' },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authAdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'actions',
        pathMatch: 'full',
      },
      {
        path: 'actions',
        component: AdminPromotionComponent,
        data: { breadcrumb: 'Actions' },
      },
      {
        path: 'categories',
        component: AdminCategoriesComponent,
        data: { breadcrumb: 'Categories' },
      },
      {
        path: 'products',
        component: AdminProductsComponent,
        data: { breadcrumb: 'Products' },
      },
      {
        path: 'orders',
        component: AdminOrdersComponent,
        data: { breadcrumb: 'Orders' },
      },
    ],
    data: { breadcrumb: 'Admin' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
