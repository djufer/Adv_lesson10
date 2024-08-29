import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { productInfoResolver } from '../../shared/services/product/product-info.resolver';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  {
    path: ':id',
    component: ProductInfoComponent,
    resolve: { productInfo: productInfoResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
