import { Component } from '@angular/core';
import { ProductResponse } from '../../../shared/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent {
  public currentProduct!: ProductResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService
  ) {}
  ngOnInit(): void {
    this.currentProduct = this.activatedRoute.snapshot.data['productInfo'];
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
