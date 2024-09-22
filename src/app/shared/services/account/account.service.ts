import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ILogin, PersonalData } from '../../interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { Firestore, getDoc, updateDoc, deleteDoc, doc } from '@angular/fire/firestore';
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
        await deleteDoc(doc(this.afs, 'users', user.uid));
        await deleteUser(user);
        this.isUserLogin$.next(false);
        localStorage.removeItem('currentUser');
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
  async updatePersonalData(personal: PersonalData): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      const userUid = user.uid;
      const userDocRef = doc(this.afs, 'users', userUid);
      try {
        await updateDoc(userDocRef, {
          'personalData.firstName': personal.firstName,
          'personalData.lastName': personal.lastName,
          'personalData.phoneNumber': personal.phoneNumber,
          'personalData.email': personal.email,
        });

         const updatedUserDoc = await getDoc(userDocRef);
         const updatedUserData = updatedUserDoc.data();
         if (updatedUserData) {
           localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
         }
        this.toastr.success('Особисті дані успішно оновлено');
      } catch (error) {
        console.error('Error updating personal data:', error);
        this.toastr.error('Не вдалося оновити особисті дані');
      }
    } else {
      this.toastr.error('Користувач не авторизований');
    }
  }
}
