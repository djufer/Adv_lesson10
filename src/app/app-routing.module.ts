import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { HomeComponent } from './pages/home/home.component';
import { PromotionComponent } from './pages/promotion/promotion.component';
import { PromotionInfoComponent } from './pages/promotion-info/promotion-info.component';

import { DrinksComponent } from './pages/product-category/drinks/drinks.component';
import { RollsComponent } from './pages/product-category/rolls/rolls.component';
import { SaucesComponent } from './pages/product-category/sauces/sauces.component';
import { SetsComponent } from './pages/product-category/sets/sets.component';

const routes: Routes = [
  // ==============================================

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'promotion', component: PromotionComponent },
  { path: 'promotion-info', component: PromotionInfoComponent },
  { path: 'delivery-payment', component: DeliveryPaymentComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
