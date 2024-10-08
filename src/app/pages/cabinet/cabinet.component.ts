import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { UserProfile } from '../../shared/interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent {
  public currentUser!: UserProfile[];

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  logout(): void {
    this.router.navigate(['/']).then(()=>{
      localStorage.removeItem('currentUser');
      this.accountService.isUserLogin$.next(true);
      }
    ).catch((e)=>{
      this.toastr.error(e);
    })

  }

  async deleteAccount(): Promise<void> {
    const confirmation = window.confirm('Ви впевнені, що хочете видалити обліковий запис? Це дію не можна скасувати.');
    if (confirmation) {
      try {
        await this.accountService.deleteAccount();
        this.logout();
      } catch (error) {
        console.error('Error during account deletion:', error);
      }
    } else {
      console.log('Видалення облікового запису скасовано.');
    }
  }
}
