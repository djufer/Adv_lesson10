import { Component } from '@angular/core';
import { ProductsService } from '../../shared/services/product/product.service';
import { CategoryService } from '../../shared/services/category/category.service';
import {
  CategoryResponse,
  ProductResponse,
} from './../../shared/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  public readMoreStatus = false;
  public userProducts: ProductResponse[] = [];
  public userCategories: CategoryResponse[] = [];
  public currentCategoryPath!: string;

  public currentProductsByCategory: ProductResponse[] = [];
  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}
  changeReadMoreStatus(): void {
    this.readMoreStatus = !this.readMoreStatus;
  }

  ngOnInit(): void {
    this.getCategories();
    this.route.params.subscribe((params) => {
      this.currentCategoryPath = params['category'];
      this.getProductsByCategory();
    });
  }
  getProductsByCategory(): void {
    this.productsService
      .getAllByCategory(this.currentCategoryPath)
      .subscribe((data) => {
        this.currentProductsByCategory = data;
        console.log(data);
        
      });
  }

  getProducts(): void {
    this.productsService.getAll().subscribe((data) => {
      this.userProducts = data;
    });
  }
  getCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.userCategories = data;
    });
  }
}
