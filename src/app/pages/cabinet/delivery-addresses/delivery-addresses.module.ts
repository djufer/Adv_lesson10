import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { DeliveryAddressesComponent } from './delivery-addresses.component';
import { DeliveryAddressesRoutingModule } from './delivery-addresses-routing.module';


@NgModule({
  declarations: [ DeliveryAddressesComponent ],
  imports: [
    CommonModule,
    DeliveryAddressesRoutingModule,
    SharedModule
  ]
})
export class DeliveryAddressesModule { }
