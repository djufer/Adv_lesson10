import { Component, OnInit } from '@angular/core';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';

@Component({
  selector: 'app-call-back-modal',
  templateUrl: './call-back-modal.component.html',
  styleUrls: ['./call-back-modal.component.scss'],
})
export class CallBackModalComponent {
  public callBackModalStatus!: boolean;

  constructor(private modalsService: ModalsService) {}

  ngOnInit(): void {
    this.modalsService.getCallBackModalStatus().subscribe((status) => {
      this.callBackModalStatus = status;
    });
  }
  closeModal(event: MouseEvent): void {
    let elem = event.target as HTMLElement;
    if (
      elem.classList.contains('call-back-modal-overlay') ||
      elem.classList.contains('btn-close')
    ) {
      this.modalsService.closeCallBackModal();
    }
  }
}
