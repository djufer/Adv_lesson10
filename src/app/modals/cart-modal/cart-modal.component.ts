import { Component } from '@angular/core';
import { OrderResponse, ProductResponse } from 'src/app/shared/interfaces/interfaces';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductsService } from 'src/app/shared/services/product/product.service';
import { OverlayService } from 'src/app/shared/services/overlay/overlay.service';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent {
  public shoppingList: OrderResponse[] = [];

  public cartModalStatus!: boolean;
  public overlayStatus!: boolean;

  public basket: ProductResponse[] = [];
  public total = 0;

  constructor(
    private productService: ProductsService,
    private orderService: OrderService,
    private overlayService: OverlayService,
    private modalsService: ModalsService
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
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }

  confirmOrder() {
    console.log('Order compleated!!');
    this.closeBasket();

    // тут якась логіка для подальшої обробки Замовлення...
    //  ...

    // очищення корзини
    this.clearBasket();
  }

  clearBasket(): void{
    localStorage.removeItem('basket');
    this.orderService.changeBasket.next(true);
    
  }
}
