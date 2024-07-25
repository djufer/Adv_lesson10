import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ILogin } from '../../interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { deleteDoc, doc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Auth, deleteUser } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public isUserLogin$ = new Subject<boolean>();
  private url = environment.BACKEND_URL;
  private api = {
    auth: `${this.url}/auth`,
  };
 

  constructor(
    private http: HttpClient,
    private afs: Firestore,
    private auth: Auth,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(credential: ILogin): Observable<any> {
    return this.http.get(
      `${this.api.auth}?email=${credential.email}&password=${credential.password}`
    );
  }

  async deleteAccount(): Promise<void> {
    const user = this.auth.currentUser;

    if (user) {
      try {
        // Видалити дані користувача з Firestore
        await deleteDoc(doc(this.afs, 'users', user.uid));

        // Видалити обліковий запис користувача з Firebase Authentication
        await deleteUser(user);

        // Оновити статус входу користувача
        this.isUserLogin$.next(false);

        // Очистити localStorage
        localStorage.removeItem('currentUser');

        // Перенаправити користувача на головну сторінку
        this.router.navigate(['/']);

        this.toastr.success('Обліковий запис успішно видалено');
      } catch (error) {
        console.error('Error deleting user account:', error);
        this.toastr.error('Не вдалося видалити обліковий запис');
      }
    } else {
      this.toastr.error('Користувач не авторизований');
    }
  }
}
