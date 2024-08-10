import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionComponent } from './promotion.component';
import { promotionInfoResolver } from '../../shared/services/promotion/promotion-info.resolver';
import { PromotionInfoComponent } from './promotion-info/promotion-info.component';


const routes: Routes = [
  {
    path: '', component: PromotionComponent,
  },
  {
    path: ':id',
    component: PromotionInfoComponent,
    resolve: {
      promotionInfo: promotionInfoResolver,
    },
    data: { breadcrumb: 'Promotion Info' },
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule { }
