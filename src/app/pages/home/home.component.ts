import { Component } from '@angular/core';
import { ProductResponse } from 'src/app/shared/interfaces/interfaces';
import { ProductsService } from '../../shared/services/product/product.service'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    private route: ActivatedRoute,
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
}
