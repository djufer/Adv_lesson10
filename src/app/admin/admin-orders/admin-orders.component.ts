import { Component } from '@angular/core';
import { OrdersService } from '../../shared/services/orders/orders.service';
import { ProductsService } from '../../shared/services/product/product.service';
import {
  OrderRequest,
  OrderResponse,
} from 'src/app/shared/interfaces/interfaces';
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
  public adminOrders: OrderResponse[] = [];
  public productsOrders: OrderResponse[] = [];
  public adminProducts: ProductResponse[] = [];

  // inputs
  public clientName!: string;
  public totalPrice!: number;
  public amount!: number;
  public shippingAddress!: string;
  public modalDetailStatus!: boolean;

  public orderStatuses: OrderStatus[] = [
    {
      id: 1,
      name: 'New',
      title: 'Нове',
      description: 'Замовлення ще не оброблене або ще не почалось оброблятися.',
    },
    {
      id: 2,
      name: 'In Progress',
      title: 'У процесі',
      description:
        'Замовлення обробляється або знаходиться у стадії виконання.',
    },
    {
      id: 3,
      name: 'Payment Pending',
      title: 'Очікується оплата',
      description: 'Замовлення готове до оплати, але оплата ще не надійшла.',
    },
    {
      id: 4,
      name: 'Paid',
      title: 'Оплачено',
      description: 'Оплата замовлення отримана та перевірена.',
    },
    {
      id: 5,
      name: 'Shipped',
      title: 'Відправлено',
      description: 'Товар був відправлений клієнту.',
    },
    {
      id: 6,
      name: 'Delivered',
      title: 'Доставлено',
      description: 'Товар був успішно доставлений клієнту.',
    },
    {
      id: 7,
      name: 'Cancelled',
      title: 'Скасовано',
      description: 'Замовлення було скасоване або відмінене або неприйняте.',
    },
  ];

  ngOnInit(): void {
    this.getOrders();
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAll().subscribe((data) => {
      this.adminProducts = data;
    });
  }
  getOrders(): void {
    this.ordersService.getOrders().subscribe((data) => {
      this.adminOrders = data;
    });
  }

  constructor(
    private ordersService: OrdersService,
    private productService: ProductsService,
    private modalsService: ModalsService
  ) {}

  openAddBlock(): void {
    this.addBlockStatus = true;
  }
  closeAddBlock(): void {
    this.addBlockStatus = false;
  }

  addOrder(): void {
    let newOrder: OrderRequest = {
      clientName: this.clientName,
      products: [],
      totalPrice: this.totalPrice,
      status: 1,
      amount: 170,
      shippingAddress: 'вул.Стуса 12',
      orderDate: new Date(),
    };
    this.ordersService.addOrder(newOrder).subscribe((data) => {
      this.getOrders();
    });
  }
  openDetailsModal(order: OrderRequest): void {
    // передаємо дані через сервіс
    this.ordersService.setCurrentOrder(order);
    // відкриваємо модалку
    this.modalsService.openDetailOrderModal();
  }
  cancelOrder(id: number): void {
    // this.ordersService.changeOrderStatus(index, 7);
    this.ordersService.changeOrderStatus(id).subscribe((data) => {
      // this.getOrders();
      console.log(data);
    });
    this.getOrders();
    // console.log(this.adminOrders[index].status);
  }
}
