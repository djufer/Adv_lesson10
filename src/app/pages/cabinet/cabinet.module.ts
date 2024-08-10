import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CabinetComponent } from './cabinet.component';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { DeliveryAddressesComponent } from './delivery-addresses/delivery-addresses.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';

@NgModule({
  declarations: [
    CabinetComponent,
    DeliveryAddressesComponent,
    NotificationsComponent,
    OrderHistoryComponent,
    PersonalDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CabinetRoutingModule
  ]
})
export class CabinetModule { }
