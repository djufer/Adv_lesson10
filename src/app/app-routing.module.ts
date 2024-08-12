import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
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
    loadChildren: () => import('./pages/products/products.module').then(m=> m.ProductsModule)                     ,
    data: { breadcrumb: 'Products' },
  },
  { path: 'delivery-payment',
    loadChildren: () => import('./pages/delivery-payment/delivery-payment.module').then(m=> m.DeliveryPaymentModule)                     ,
   data: { breadcrumb: 'Delivery' } },
  { path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m=> m.AboutModule),
     data: { breadcrumb: 'About' } },
  { path: 'auth',
    loadChildren: () => import('./pages/authorization/authorization.module').then(m=> m.AuthorizationModule),
    data: { breadcrumb: 'auth' } },
  {
    path: 'auth-dialog',
    loadChildren: () => import('./components/auth-dialog/auth-dialog.module').then(m=> m.AuthDialogModule)
  },
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
