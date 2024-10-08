import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OverlayService } from '../overlay/overlay.service';

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  private $cartModalStatusSource = new BehaviorSubject<boolean>(false);
  public cartModalStatus = this.$cartModalStatusSource.asObservable();

  constructor(private overlayService: OverlayService) {}

  getCartModalStatus(): Observable<boolean> {
    return this.cartModalStatus;
  }
  closeCartModal(): void{
    this.$cartModalStatusSource.next(false);
  }
  openCartModal() {
    this.$cartModalStatusSource.next(true);
  }

  closeAllModals(): void {
    this.overlayService.closeOverlay();
    this.$cartModalStatusSource.next(false);
    this.$callBackModalStatusSource.next(false);
  }

  private $callBackModalStatusSource = new BehaviorSubject<boolean>(false);
  public callBackModalStatus = this.$callBackModalStatusSource.asObservable();
  getCallBackModalStatus(): Observable<boolean> {
    return this.callBackModalStatus;
  }
  openCallBackModal(): void {
    this.$callBackModalStatusSource.next(true);
  }
  closeCallBackModal(): void {
    this.$callBackModalStatusSource.next(false);
  }


}
