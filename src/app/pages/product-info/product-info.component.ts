import { Component } from '@angular/core';
import { ProductRequest, ProductResponse } from '../../shared/interfaces/interfaces'
import { ProductsService } from 'src/app/shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent {
  public product!: ProductResponse;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    let PRODUCT_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productsService.getOne(PRODUCT_ID).subscribe((data) => {
      this.product = data;
    });
  }
}
