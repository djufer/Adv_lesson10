import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import {
  UserProfile, 
  PersonalData,
  UserNotification,
  DeliveryAddress,
} from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent {
  public currentUser!: UserProfile[];

  constructor(private router: Router, private accountService: AccountService) {}

  // логіка для відкриття і закриття пунктів дропдауна  ____
  

  // ___

  getUser(): void{

  }

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
