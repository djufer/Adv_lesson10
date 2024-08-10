import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionRoutingModule } from './promotion-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PromotionComponent } from './promotion.component';
import { PromotionInfoComponent } from './promotion-info/promotion-info.component';

@NgModule({
  declarations: [ PromotionComponent, PromotionInfoComponent ],
  imports: [
    CommonModule,
    PromotionRoutingModule,
    SharedModule
  ]
})
export class PromotionModule { }
