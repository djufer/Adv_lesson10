import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminPromotionComponent } from './admin-promotion/admin-promotion.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';



const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'actions', pathMatch: 'full'},
      { path: 'actions', component: AdminPromotionComponent, data: { breadcrumb: 'Actions' } },
      { path: 'categories', component: AdminCategoriesComponent, data: { breadcrumb: 'Categories' } },
      { path: 'products', component: AdminProductsComponent, data: { breadcrumb: 'Products' } },
      { path: 'orders', component: AdminOrdersComponent, data: { breadcrumb: 'Orders' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
