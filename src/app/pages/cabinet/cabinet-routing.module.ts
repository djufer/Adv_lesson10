import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { PersonalDataComponent } from "./personal-data/personal-data.component";
import { OrderHistoryComponent } from "./order-history/order-history.component";
import { DeliveryAddressesComponent } from "./delivery-addresses/delivery-addresses.component";
import { NotificationsComponent } from "./notifications/notifications.component";


const routes: Routes = [
  {
    path: '', component: CabinetComponent, // Головний маршрут з `CabinetComponent` як основний
    children: [ // Дочірні маршрути
      { path: '', redirectTo: 'personal-data', pathMatch: 'full' },
      { path: 'personal-data', component: PersonalDataComponent },
      { path: 'order-history', component: OrderHistoryComponent },
      { path: 'delivery-addresses', component: DeliveryAddressesComponent },
      { path: 'notifications', component: NotificationsComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
