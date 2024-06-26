import { Component } from '@angular/core';
import { ProductResponse, CategoryResponse } from '../../shared/interfaces/interfaces';
import { ProductsService } from '../../shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public moreTextStatus = false;

  public homeProducts: ProductResponse[] = [];
  public homeRollProducts: ProductResponse[] = [];
  public homeCategories: CategoryResponse[] = [];

  public rollSubCategories: string[] = [
    'Всі',
    'Роли Філадельфія',
    'Роли Каліфорнія',
    'Запечені Роли',
    'Фірмові Суші',
    'Роли Макі',
    'Преміум Суші',
  ];
  selectedSubCategory: string = 'Всі';

  constructor(
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.getRollProducts();
  }
  getProducts(): void {
    this.productsService.getAll().subscribe((data) => {
      this.homeProducts = data;
    });
  }
  // тут я витягую конкретно по категорії роли
  getRollProducts(): void {
    this.productsService
      .getAllByCategory('rolls')
      .subscribe((data) => {
        this.homeRollProducts = data;
      });
  }
  selectCategory(subCateg: string): void {
    this.selectedSubCategory = subCateg;
    
  }

  getOne(id: number): void {}

  changeMoreTextStatus() {
    this.moreTextStatus = !this.moreTextStatus;
  }
}
