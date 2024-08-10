import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';

import { productInfoResolver } from './shared/services/product/product-info.resolver';
import { authAdminGuard } from './shared/guards/auth/authAdmin.guard';



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
    loadChildren: () => import('./pages/promotion/promotion.module').then(m=> m.PromotionModule),
    data: { breadcrumb: 'Promotion' },
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
  { path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m=> m.AboutModule),
     data: { breadcrumb: 'About' } },
  { path: 'auth',
    loadChildren: () => import('./pages/authorization/authorization.module').then(m=> m.AuthorizationModule),
    data: { breadcrumb: 'auth' } },
  { path: 'cabinet',
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(m=> m.CabinetModule),
   data: { breadcrumb: 'cabinet' },

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
