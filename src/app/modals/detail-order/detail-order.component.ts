import { Component } from '@angular/core';
import { OrderResponse, ProductRequest } from 'src/app/shared/interfaces/interfaces';
import { OrdersService } from "../../shared/services/orders/orders.service"
import { ProductsService } from "../../shared/services/product/product.service"
import { OrderStatus } from 'src/app/shared/interfaces/interfaces';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss'],
})
export class DetailOrderComponent {
  public datailOrders: OrderResponse[] = [];
  public datailOrdersProducts: ProductRequest[] = [];
  public currentOrder!: OrderResponse;
  public detailOrderModalStatus!: boolean;

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

  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private modalsService: ModalsService
  ) {}

  ngOnInit(): void {
    this.getOrders();
    this.getProducts();

    this.modalsService.getDetailOrderModalStatus().subscribe((status) => {
      this.detailOrderModalStatus = status;
    });

    this.ordersService.data$.subscribe((data) => {
      this.currentOrder = data;
    });
  }
  getProducts(): void {
    this.productsService.getAll().subscribe((data) => {
      this.datailOrdersProducts = data;
    });
  }
  getOrders(): void{
    this.ordersService.getOrders().subscribe(data => {
      this.datailOrders = data;
    })
  }



  closeModal(): void {
    this.modalsService.closeDetailOrderModal();
  }
}
