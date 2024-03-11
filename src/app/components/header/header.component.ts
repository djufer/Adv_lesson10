import { Component } from '@angular/core';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { ModalsService } from 'src/app/shared/services/modals.service';

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

  constructor(
    private overlayService: OverlayService,
    private modalsService: ModalsService
  ) {}
  ngOnInit(): void {
    this.modalsService.getcartModalStatus().subscribe((status) => {
      this.isCartStatus = status;
      
    });
  }
  toggleBurger(): void {
    this.isOpenBurger = !this.isOpenBurger;
  }
  openCloseCart() {
      this.overlayService.changeOverlayStatus();
      this.isCartStatus = !this.isCartStatus;
  
  }
}
