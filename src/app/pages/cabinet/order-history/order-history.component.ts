import { Component } from '@angular/core';
import { OrderRequest, UserProfile } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent {
  public ordersByUser!: OrderRequest[];

  constructor() { }
  ngOnInit(): void {
    this.getOrdersByUser();
  }

  getOrdersByUser(): void{
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    this.ordersByUser = currentUser.ordersHistory;
  }
  
}
