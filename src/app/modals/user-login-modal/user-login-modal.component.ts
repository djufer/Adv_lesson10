import { Component } from '@angular/core';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';

@Component({
  selector: 'app-user-login-modal',
  templateUrl: './user-login-modal.component.html',
  styleUrls: ['./user-login-modal.component.scss'],
})
export class UserLoginModalComponent {
  public userLoginModalStatus!: boolean;

  constructor(private modalsService: ModalsService) {}

  ngOnInit(): void {
    this.modalsService.getUserLoginModalStatus().subscribe((status) => {
      this.userLoginModalStatus = status;
    });
  }
  closeModal(event: MouseEvent): void {
    let elem = event.target as HTMLElement;
    if (
      elem.classList.contains('user-login-modal-overlay') ||
      elem.classList.contains('btn-close')
    ) {
      this.modalsService.closeUserLoginModal();
    }
  }
}
