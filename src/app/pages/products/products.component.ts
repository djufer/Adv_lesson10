import { Component } from '@angular/core';
import { ProductsService } from '../../shared/services/product/product.service';
import {
  ProductResponse,
} from './../../shared/interfaces/interfaces';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  public readMoreStatus = false;

  public currentProductsByCategory: ProductResponse[] = [];

  private eventSubscription!: Subscription;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getProductsByCategory();
      }
    });
  }
  changeReadMoreStatus(): void {
    this.readMoreStatus = !this.readMoreStatus;
  }

  ngOnInit(): void {}

  getProductsByCategory(): void {
    const categoryName = this.route.snapshot.paramMap.get('category') as string;
    this.productsService.getAllByCategory(categoryName).subscribe((data) => {
      this.currentProductsByCategory = data;
    });
  }
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
