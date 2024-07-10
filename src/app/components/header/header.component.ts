import { Component, HostListener, numberAttribute } from '@angular/core';
import { OverlayService } from 'src/app/shared/services/overlay/overlay.service';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { CategoryResponse, ProductResponse } from '../../shared/interfaces/interfaces';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // анімація для бургера
  public isOpenBurger = false;
  public isCartStatus!: boolean;
  public shoppingListHeade = [];
  public isOpenAboutModal!: boolean;
  public headerCategories: CategoryResponse[] = [];

  public totalCount: number = 0;
  private basket: ProductResponse[] = [];
  // total price
  public total = 0;

  constructor(
    private overlayService: OverlayService,
    private modalsService: ModalsService,
    private categoryService: CategoryService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.modalsService.getCartModalStatus().subscribe((status => {
      this.isCartStatus = status
    }));
    this.getCategories();
    this.loadBasket();
    this.updateBasket();
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
    if (this.isCartStatus) {
      this.overlayService.closeOverlay();
      this.modalsService.closeCartModal()
    } else {
      this.overlayService.openOverlay();
      this.modalsService.openCartModal();
    }
  }
  openCart() {
    this.overlayService.openOverlay();
    this.modalsService.openCartModal();
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

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      this.totalCount = this.basket.length
      this.getTotalPrice();
    }
    else {
      this.total = 0;
      this.totalCount = 0
    }
  }
  getTotalPrice(): void {
    this.total = this.basket.reduce(
      (total: number, prod: ProductResponse) => total + prod.count * prod.price,
      0
    );
  }

  updateBasket(): void{
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }
}
