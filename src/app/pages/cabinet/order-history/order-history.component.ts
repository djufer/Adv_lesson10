import { Component } from '@angular/core';
import { OrderRequest, OrderResponse } from 'src/app/shared/interfaces/interfaces';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent{
  public ordersByUser!: OrderResponse[];

  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.getOrdersByUserId();
  }

  getCurrentUserId(): string{
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    return  currentUser.uid;
  }
  getOrdersByUserId(): void{
    this.ordersService.getOrdersById(this.getCurrentUserId()).then((data)=>{
      this.ordersByUser = data;
    }).catch((e)=>{
      this.toastr.error('щось не те..')
    })
  }
}
