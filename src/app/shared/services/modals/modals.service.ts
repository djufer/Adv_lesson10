import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OverlayService } from '../overlay/overlay.service';

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  // модаока корзини cart-modal
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

  // модалка call-back START
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
  // модалка call-back FIN
  // ---------------------
  // модалка user-login START
  private $userLoginModalStatusSource = new BehaviorSubject<boolean>(false);
  public userLoginModalStatus = this.$userLoginModalStatusSource.asObservable();
  getUserLoginModalStatus(): Observable<boolean> {
    return this.userLoginModalStatus;
  }
  openUserLoginModal(): void {
    this.$userLoginModalStatusSource.next(true);
  }
  closeUserLoginModal(): void {
    this.$userLoginModalStatusSource.next(false);
  }
  // модалка user-login FIN

  private $detailOrderModalStatusSource = new BehaviorSubject<boolean>(false);
  public detailOrderModalStatus =
    this.$detailOrderModalStatusSource.asObservable();
  getDetailOrderModalStatus(): Observable<boolean> {
    return this.detailOrderModalStatus;
  }
  openDetailOrderModal(): void {
    this.$detailOrderModalStatusSource.next(true);
  }
  closeDetailOrderModal(): void {
    this.$detailOrderModalStatusSource.next(false);
  }
  //
}
