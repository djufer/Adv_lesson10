import { Injectable } from '@angular/core';
import { OrderRequest, OrderResponse } from '../../interfaces/interfaces';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private url = environment.BACKEND_URL;
  private api = {
    orders: `${this.url}/orders`,
  };

  public currentOrder!: OrderResponse;
  public changeBasket = new Subject<boolean>;

  // public orders: OrderResponse[] = [
  //   {
  //     id: 346,
  //     clientName: 'Василь',
  //     products: [],
  //     totalPrice: 235,
  //     status: 4,
  //     amount: 170,
  //     shippingAddress: 'вул.Стуса 12',
  //     orderDate: new Date(),
  //   },
  //   {
  //     id: 345,
  //     clientName: 'Петро',
  //     products: [],
  //     totalPrice: 235,
  //     status: 2,
  //     amount: 170,
  //     shippingAddress: 'вул.Стуса 12',
  //     orderDate: new Date(),
  //   },
  // ];

  constructor(private http: HttpClient) {}

 
  getOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(this.api.orders);
  }

  getCurrentOrder(): OrderResponse {
    return this.currentOrder;
  }
  changeOrderStatus(id: number, status: number = 7): Observable<OrderResponse> {
    return this.http.patch<OrderResponse>(`${this.api.orders}/${id}`, {
      status,
    });
  }
  addOrder(newOrder: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.api.orders, newOrder);
  }

  // підписка на поточне замовлення
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  setCurrentOrder(data: any): void {
    this.dataSubject.next(data);
  }
}
