import { Component, OnInit } from '@angular/core';

import { OverlayService } from './shared/services/overlay/overlay.service';
import { ModalsService } from './shared/services/modals/modals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lesson08';
  public overlayStatus!: boolean;
  public callBackModalStatus!: boolean;

  constructor(
    private overlayService: OverlayService,
    private modalsService: ModalsService
  ) {}

  ngOnInit(): void {
    this.overlayService.getOverlayStatus().subscribe((status) => {
      this.overlayStatus = status;
    });
  }
  closeAllModals(): void {
    this.modalsService.closeAllModals();
  }
}
