import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent {
  constructor(private router: Router, private accountService: AccountService) {}

  // логіка для відкриття і закриття пунктів дропдауна  ____
  public dropdownItems = [
    {
      name: 'Історія замовлень',
      isOpen: false,
    },
    {
      name: 'Персональні дані',
      isOpen: false,
    },
    {
      name: 'Адреси доставки',
      isOpen: false,
    },
    {
      name: 'Повідомлення',
      isOpen: false,
    },
  ];
  changDropdown(itemName: string): void {
    for (let i = 0; i < this.dropdownItems.length; i++) {
      if (itemName === this.dropdownItems[i].name) {
        if (this.dropdownItems[i].isOpen) {
          this.dropdownItems[i].isOpen = false;
        } else {
          this.dropdownItems[i].isOpen = true;
        }
      } else {
        this.dropdownItems[i].isOpen = false;
      }
    }
  }
  // ___

  logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }

  async deleteAccount(): Promise<void> {
    try {
      await this.accountService.deleteAccount();
      // localStorage.removeItem('currentUser');
      this.logout();
    } catch (error) {
      console.error('Error during account deletion:', error);
    }
  }
}
