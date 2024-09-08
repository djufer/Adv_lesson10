import { Component, HostListener, numberAttribute } from '@angular/core';
import { OverlayService } from 'src/app/shared/services/overlay/overlay.service';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import {
  CategoryResponse,
  ProductResponse,
} from '../../shared/interfaces/interfaces';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // анімація для бургера
  public isOpenBurger = false;
  public isCartStatus!: boolean;
  public headerCategories: CategoryResponse[] = [];

  public totalCount: number = 0;
  public basket: ProductResponse[] = [];
  // total price
  public total = 0;

  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';
  constructor(
    private overlayService: OverlayService,
    private modalsService: ModalsService,
    public categoryService: CategoryService,
    private ordersService: OrdersService,
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.modalsService.getCartModalStatus().subscribe((status) => {
      this.isCartStatus = status;
    });
    this.getCategories();
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
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
      this.modalsService.closeCartModal();
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
      this.totalCount = this.basket.length;
      this.getTotalPrice();
    } else {
      this.total = 0;
      this.totalCount = 0;
    }
  }
  getTotalPrice(): void {
    this.total = this.basket.reduce(
      (total: number, prod: ProductResponse) => total + prod.count * prod.price,
      0
    );
  }
  updateBasket(): void {
    this.ordersService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

    if (currentUser && currentUser.personalData && currentUser.personalData.role) {
      if (currentUser.personalData.role === ROLE.ADMIN) {
        this.isLogin = true;
        this.loginUrl = 'admin';
        this.loginPage = 'Admin';
      } else if (currentUser.personalData.role === ROLE.USER) {
        this.isLogin = true;
        this.loginUrl = 'cabinet';
        this.loginPage =
          currentUser.personalData.firstName.charAt(0).toUpperCase() +
          currentUser.personalData.firstName.slice(1);
      }
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    });
  }

  openLoginDialog(): void {
    if (this.isLogin) {
      if(this.loginUrl === 'admin'){
        this.router.navigate(['/admin']);
      }else {
        this.router.navigate(['/cabinet']);
      }

    }

    else {
      this.dialog.open(AuthDialogComponent, {
        width: '500px',
        autoFocus: false,
      });
    }
  }
}
