import { Component } from '@angular/core';
import { OrdersService } from '../../shared/services/orders/orders.service';
import { ProductsService } from '../../shared/services/product/product.service';
import { OrderResponse } from 'src/app/shared/interfaces/interfaces';
import { OrderStatus } from 'src/app/shared/interfaces/interfaces';
import { ProductResponse } from 'src/app/shared/interfaces/interfaces';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent {
  public addBlockStatus = false;








}
