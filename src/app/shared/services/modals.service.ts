import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OverlayService } from './overlay.service';

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  private $cartModalStatusSource = new BehaviorSubject<boolean>(false);
  public cartModalStatus = this.$cartModalStatusSource.asObservable();

  constructor(private overlayService: OverlayService) {}

  getcartModalStatus(): Observable<boolean> {
    return this.cartModalStatus;
  }

  closeAllModals(): void {
    this.overlayService.changeOverlayStatus();
    this.$cartModalStatusSource.next(false);
    
  }
}
