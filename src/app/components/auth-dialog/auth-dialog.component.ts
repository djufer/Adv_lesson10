import { Component } from '@angular/core';
import { Auth, deleteUser } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { docData, doc, Firestore, setDoc, deleteDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent {
  public authForm!: FormGroup;
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
      },
      {
        validators: this.isLogin ? [] : [this.passwordMatchValidator],
      }
    );

    this.authForm.updateValueAndValidity();
  }
  // перевірка чи збігаються пароль і повторний пароль
  passwordMatchValidator(
    formGroup: FormGroup
  ): { [key: string]: boolean } | null {
    const password = formGroup.get('password');
    const repeatPassword = formGroup.get('repeatPassword');
    return password && repeatPassword && password.value === repeatPassword.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.displayValidationErrors();
      return;
    }
    if (this.isLogin) {
      this.loginUser();
    } else {
      this.registerUser();
    }
  }
  displayValidationErrors(): void {
    for (const key of Object.keys(this.authForm.controls)) {
      const control = this.authForm.get(key);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    }
  }

  loginUser(): void {
    // this.dialogRef.close({
    //   formData: this.authForm.value,
    // });
    const { email, password } = this.authForm.value;
    this.login(email, password)
      .then(() => {
        this.toastr.success('User successfully login');
      })
      .catch((e) => {
        this.toastr.error(e.message);
      });
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe({
      next: (user) => {
        if (this.auth.currentUser) {
          const currentUser = { ...user, uid: credential.user.uid };
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          if (user && user['role'] === ROLE.USER) {
            this.router.navigate(['/cabinet']);
          } else if (user && user['role'] === ROLE.ADMIN) {
            this.router.navigate(['/admin']);
          }
          this.accountService.isUserLogin$.next(true);
        }
      },
      error: (e) => {
        console.log('error', e);
      },
    });
  }

  registerUser(): void {
    const { email, password } = this.authForm.value;
    if (this.authForm.valid) {
      alert('URAAAAAAA');
      this.emailSignUp(email, password)
        .then(() => {
          this.toastr.success('User successfully created');
          this.isLogin = !this.isLogin;
          this.authForm.reset();
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
      email: credential.user.email,
      firstName: this.authForm.value.firstName,
      lastName: this.authForm.value.lastName,
      phoneNumber: this.authForm.value.phoneNumber,
      orders: [],
      role: 'USER',
    };

    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  closeDialog(): void{
    this.dialogRef.close(); 
  }
}
