import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';


const routes: Routes = [
  {
    path: '', component: CabinetComponent, // Головний маршрут з `CabinetComponent` як основний
    children: [ // Дочірні маршрути
      { path: '', redirectTo: 'personal-data', pathMatch: 'full' },
      { path: 'personal-data',
        loadChildren: () => import('./personal-data/personal-data.module').then(m=> m.PersonalDataModule)},
      { path: 'order-history',
        loadChildren: () => import('./order-history/order-history.module').then(m=> m.OrderHistoryModule) },
      { path: 'delivery-addresses',
        loadChildren: () => import('./delivery-addresses/delivery-addresses.module').then(m=> m.DeliveryAddressesModule) },
      { path: 'notifications',
        loadChildren: () => import('./notifications/notifications.module').then(m=> m.NotificationsModule) },
      { path: 'change-password',
        loadChildren: () => import('./change-password/change-password.module').then(m=> m.ChangePasswordModule) },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
