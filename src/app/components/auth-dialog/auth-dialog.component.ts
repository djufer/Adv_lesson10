import {Component, OnInit} from '@angular/core';
import { Auth} from '@angular/fire/auth';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { docData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent implements OnInit{
  public authForm!: FormGroup;
  public checkPassword = false;
  public isLogin = true;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private auth: Auth,
    private dialogRef: MatDialogRef<AuthDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initAuthForm();
  }

  changeIsLoginStatus(): void {
    this.isLogin = !this.isLogin;
    this.initAuthForm();
  }
  initAuthForm(): void {
    this.authForm = this.fb.group(
      {
        firstName: [null, this.isLogin ? [] : [Validators.required]],
        lastName: [null, this.isLogin ? [] : [Validators.required]],
        phoneNumber: [null, this.isLogin ? [] : [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required]],
        repeatPassword: [null, this.isLogin ? [] : [Validators.required]],
      }
    );
  }
  // перевірка чи збігаються пароль і повторний пароль


  onSubmit(): void {
    if (this.authForm.invalid) {
      console.log('invalid')
      return;
    }
    if (this.isLogin) {

      this.loginUser();
    } else {
      this.registerUser();
    }
  }


  loginUser(): void {
    const { email, password } = this.authForm.value;
    console.log('Calling login with:', email, password);
    this.login(email, password).catch((e) => {
      this.toastr.error(e.message);
    });
  }
  // логінування тільки для юзерів! НЕ для адмінів.
  async login(email: string, password: string): Promise<void> {
    try {
      const credential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      docData(doc(this.afs, 'users', credential.user.uid))
        .pipe(take(1)) // Підписка буде оброблена лише один раз
        .subscribe({
        next: (user) => {
          if (this.auth.currentUser) {
            const currentUser = { ...user, uid: credential.user.uid };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            if (user && user['personalData'].role === ROLE.USER) {
              this.router.navigate(['/cabinet']);
              this.accountService.isUserLogin$.next(true);
              this.toastr.success('User successfully logged in');
              //-----------------------
            } else if (user && user['personalData'].role === ROLE.ADMIN) {
              this.toastr.error('You are not a User');
              localStorage.removeItem('currentUser');
              this.accountService.isUserLogin$.next(false);
            }
          }
        },
        error: (e) => {
          console.log('error', e);
          this.toastr.error('Error occurred while logging in.');
        },
      });
    } catch (e: any) {
      this.toastr.error(e.message);
    }
  }

  registerUser(): void {
    const { email, password } = this.authForm.value;
    if (this.authForm.valid) {
      this.emailSignUp(email, password)
        .then(() => {
          this.isLogin = !this.isLogin;
          this.login(email, password)
            .catch((e) => {
              this.toastr.error(e.message);
            })
            .finally(() => {
              this.router.navigate(['/cabinet']);
              this.authForm.reset();
            });
        })
        .catch((e) => {
          this.toastr.error(e.message);
        });
    } else {
      alert('form is invalid');
    }
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = {
      personalData: {
        email: credential.user.email,
        firstName: this.authForm.value.firstName,
        lastName: this.authForm.value.lastName,
        phoneNumber: this.authForm.value.phoneNumber,
        role: 'USER',
      },
      purchaseHistory: [],
      notifications: [],
      deliveryAddresses: []
    };
    await setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  closeDialog(): void{
    this.dialogRef.close();
  }

  checkConfirmedPassword(): void{
    this.checkPassword = this.password.value === this.confirmed.value;
    if(this.password.value !== this.confirmed.value ){
      this.authForm.controls['repeatPassword'].setErrors({
        matchError: `Password confirmation doesn't match`
      })
    }
  }

  get password(): AbstractControl{
      return  this.authForm.controls['password']
  }

  get confirmed(): AbstractControl{
     return  this.authForm.controls['repeatPassword']
  }

  checkVisibilityError(control: string, name: string): boolean | null{
    return this.authForm.controls[control].errors?.[name];
  }
}
