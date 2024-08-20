import { Component, OnInit} from '@angular/core';
import { Auth} from '@angular/fire/auth';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
export class AuthDialogComponent implements OnInit {
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;
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
    this.initLoginForm();
    this.initRegisterForm();
  }

  changeIsLoginStatus(): void {
    this.isLogin = !this.isLogin;
    this.initLoginForm();
    this.initRegisterForm();
  }
  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }
  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmedPassword: [null, [Validators.required]],
    });
  }
  // перевірка чи збігаються пароль і повторний пароль

  onSubmit(): void {
    if (this.isLogin) {
      if(this.loginForm.valid){
        this.loginUser();
      }
      else {
        this.toastr.error('login form invalid')
      }
    } else {
      if(this.registerForm.valid){
        this.registerUser();
      }
      else {
        this.toastr.error('register form is invalid')
      }
    }
  }

  loginUser(): void {
    const { email, password } = this.loginForm.value;
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
        .pipe(take(1)) // Підписка буде оброблена лише один раз, зробив для того щоб тостер не висткакував кілька разів
        .subscribe({
          next: (user) => {
            if (this.auth.currentUser) {
              const currentUser = { ...user, uid: credential.user.uid };
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              if (user && user['personalData'].role === ROLE.USER) {
                this.router.navigate(['/cabinet']);
                this.accountService.isUserLogin$.next(true);
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
    const { email, password } = this.registerForm.value;
    if (this.registerForm.valid) {
      this.emailSignUp(email, password)
        .then( async () => {

          await this.login(email, password).then(()=>{
            this.closeDialog();
            this.isLogin = !this.isLogin;
          })
            .catch((e) => {
              this.toastr.error(e.message);
            })
            .finally(() => {
              this.registerForm.reset();
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
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        phoneNumber: this.registerForm.value.phoneNumber,
        role: 'USER',
      },
      purchaseHistory: [],
      notifications: [],
      deliveryAddresses: [],
      pickupLocations: []
    };
    await setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  checkConfirmedPassword (): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if (this.password.value !== this.confirmed.value) {
      this.registerForm.controls['confirmedPassword'].setErrors({
        matchError: 'Password confirmation doesnt match',
      });
    } else {
      // Якщо паролі збігаються, видаляємо помилку
      this.registerForm.controls['confirmedPassword'].setErrors(null);
    }
  }

  get password(): AbstractControl {
    return this.registerForm.controls['password'];
  }

  get confirmed(): AbstractControl {
    return this.registerForm.controls['confirmedPassword'];
  }

  checkVisibilityError(control: string, name: string): boolean | null {
    return this.registerForm.controls[control].errors?.[name];
  }
}
