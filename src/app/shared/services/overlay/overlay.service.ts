import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private $overlayStatusSource = new BehaviorSubject<boolean>(false);
  public overlayStatus = this.$overlayStatusSource.asObservable();

  getOverlayStatus(): Observable<boolean> {
    return this.overlayStatus;
  }

  changeOverlayStatus(): void {
    const currentStatus = this.$overlayStatusSource.getValue();
    this.$overlayStatusSource.next(!currentStatus);
  }
}
