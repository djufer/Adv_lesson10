import { Component } from '@angular/core';
import { ProductResponse } from 'src/app/shared/interfaces/interfaces';
import { ProductsService } from '../../shared/services/product/product.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public homeProducts: ProductResponse[] = [];

  public eventSubscription!: Subscription;

  constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadProducts();
      }
    });
  }
  ngOnInit(): void {}

  loadProducts(): void {
    this.productsService.getAll().subscribe((data) => {
      this.homeProducts = data;
    });
  }

  productCount(product: ProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  addToBasket(product: ProductResponse): void {
    let basket: Array<ProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some((prod) => prod.id === product.id)) {
        const index = basket.findIndex((prod) => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.ordersService.changeBasket.next(true);
  }
}
