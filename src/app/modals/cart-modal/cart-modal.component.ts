import { Component } from '@angular/core';
import {
  OrderRequest, OrderResponse,
  ProductResponse
} from 'src/app/shared/interfaces/interfaces';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { OverlayService } from 'src/app/shared/services/overlay/overlay.service';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';
import { CountOrderIDService } from 'src/app/shared/services/countOrderID/count-order-id.service';
import { ORDER_STATUSES } from 'src/app/shared/constants/order-status.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent {
  private orderStatuses = ORDER_STATUSES;
  public cartModalStatus!: boolean;
  public overlayStatus!: boolean;

  public basket: ProductResponse[] = [];
  public total: number = 0;

  constructor(
    private ordersService: OrdersService,
    private overlayService: OverlayService,
    private modalsService: ModalsService,
    private countOrderIDService: CountOrderIDService,
    private toastr: ToastrService,

  ) {}

  ngOnInit(): void {
    this.modalsService.getCartModalStatus().subscribe((status) => {
      this.cartModalStatus = status;
    });
    this.overlayService.getOverlayStatus().subscribe((status) => {
      this.overlayStatus = status;
    });
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce(
      (total: number, prod: ProductResponse) => total + prod.count * prod.price,
      0
    );
  }

  closeBasket(): void {
    this.modalsService.closeCartModal();
    this.overlayService.closeOverlay();
  }

  updateBasket(): void {
    this.ordersService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }

  async confirmOrder() {
    // Перетворюємо корзину продуктів на замовлення
    const order = await this.createOrderFromBasket(); // Переконайтесь, що ви дочекалися результату

    try {
      // Додаємо замовлення у Firestore і отримуємо його унікальний ідентифікатор
      const orderRef = await this.ordersService.addOrder(order);
      this.clearBasket();
      this.closeBasket();
      this.toastr.success('Замовлення успішно сформоване')
    } catch (error) {
      console.error('Error adding order: ', error);
    }
  }


  async createOrderFromBasket(): Promise<OrderResponse> {
    let currentUserString = localStorage.getItem('currentUser');
    let userId: string;
    let orderId: number;
    let stringOrderID: string;

    try {
      // Отримуємо наступний ID замовлення
      orderId = await this.countOrderIDService.getNextOrderID();
      stringOrderID = orderId.toString().padStart(6, '0');
      if (currentUserString) {
        try {
          let currentUser = JSON.parse(currentUserString);
          userId = currentUser.uid;
        } catch (error) {
          console.error('Error parsing JSON:', error);
          userId = 'Unlogged-in user-id';
        }
      } else {
        console.error('No user data found in localStorage.');
        userId = 'Unlogged-in user-id';
      }

      return {
        orderID: stringOrderID,
        userId: userId,
        products: this.basket,
        totalPrice: this.total,
        status: this.orderStatuses[1],
        shippingAddress: 'Some address',
        orderDate: new Date(),
      };
    } catch (e) {
      console.error('Error getting order ID:', e);
      throw new Error('Could not create order due to ID retrieval issue.');
    }
  }


  clearBasket(): void {
    localStorage.removeItem('basket');
    this.ordersService.changeBasket.next(true);
  }
}
