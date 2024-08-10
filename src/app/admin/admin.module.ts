import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminPromotionComponent } from './admin-promotion/admin-promotion.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent} from './admin-products/admin-products.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    AdminPromotionComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminCategoriesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
]
})
export class AdminModule { }
