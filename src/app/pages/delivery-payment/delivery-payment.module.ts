import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DeliveryPaymentComponent } from './delivery-payment.component';
import { DeliveryPaymentRoutingModule } from './delivery-payment-routing.module';


@NgModule({
  declarations: [ DeliveryPaymentComponent ],
  imports: [
    CommonModule,
    SharedModule,
    DeliveryPaymentRoutingModule
  ]
})
export class DeliveryPaymentModule { }
