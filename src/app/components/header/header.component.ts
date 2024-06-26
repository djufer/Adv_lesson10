import { Component, HostListener } from '@angular/core';
import { OverlayService } from 'src/app/shared/services/overlay/overlay.service';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { CategoryResponse } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // анімація для бургера
  public isOpenBurger = false;
  public isCartStatus!: boolean;
  public shoppingList = [];
  public isOpenAboutModal!: boolean;
  public headerCategories: CategoryResponse[] = [];
  

  constructor(
    private overlayService: OverlayService,
    private modalsService: ModalsService,
    private categoryService: CategoryService
    
  ) {}

  ngOnInit(): void {
    this.modalsService.getcartModalStatus().subscribe((status) => {
      this.isCartStatus = status;
    });
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.headerCategories = data;
    });
  }

  toggleBurger(): void {
    this.isOpenBurger = !this.isOpenBurger;
  }
  openCloseCart() {
    this.overlayService.changeOverlayStatus();
    this.isCartStatus = !this.isCartStatus;
  }
  openCallBackModal() {
    this.modalsService.openCallBackModal();
  }
  openUserLoginModal() {
    // this.modalsService.openUserLoginModal();  // поки що закоментовую а пізніше зробюлю логінування через модалку
  }
  // ==========================
  // ---Закриття дропдаун і модалки корзини кліком по вікні документа
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // закриття дропдаун меню
    const burgerElement = event.target as HTMLElement;
    const burger = burgerElement.closest('.burger-menu');

    if (this.isOpenBurger && !burger) {
      this.toggleBurger();
    }
    // закриття модалки корзини
    const basketElement = event.target as HTMLElement;
    const basket = basketElement.closest('.basket-block');
    if (this.isCartStatus && !basket) {
      const cartElement = event.target as HTMLElement;
      const cart = cartElement.closest('.cart-modal');
      if (!cart) {
        this.openCloseCart();
      }
    }
  }
}
