import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import { AuthDialogComponent } from './auth-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Firestore} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from '../../shared/services/account/account.service';
import { Router } from '@angular/router';
import {RouterTestingModule} from "@angular/router/testing";

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;
  let accountService: jasmine.SpyObj<AccountService>;
  let auth: jasmine.SpyObj<Auth>;
  let firestore: any;

  beforeEach(() => {
    // Створюємо моковий об'єкт з методом error
    toastrService = jasmine.createSpyObj('ToastrService', ['error']);

    // Створюємо моковий об'єкт для AccountService
    accountService = jasmine.createSpyObj('AccountService', ['isUserLogin$']);
    accountService.isUserLogin$ = {
      next: jasmine.createSpy('next')
    } as any;

    // Створюємо мокований об'єкт `Router` і зберігаємо його в змінній `router`
    router = jasmine.createSpyObj('Router', ['navigate']);

    auth = jasmine.createSpyObj('Auth', {
      signInWithEmailAndPassword: Promise.resolve({ user: { uid: 'user-id' } })
    });
    // ------тимчас-----
    // Створюємо мокований docData, який повертає Observable з даними користувача
    const docDataSpy = jasmine.createSpy('docData').and.returnValue(of({
      personalData: { role: ROLE.USER }
    }));

    // Правильне мокаєння Firestore і docData
    firestore = jasmine.createSpyObj('Firestore', ['doc']);
    firestore.doc.and.returnValue({
      docData: jasmine.createSpy().and.returnValue(of({ personalData: { role: ROLE.USER } })),
    });
    // ------тимчас-----

    TestBed.configureTestingModule({
      declarations: [AuthDialogComponent],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: Firestore, useValue: firestore },
        { provide: Auth, useValue: auth },
        { provide: ToastrService, useValue: toastrService },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: AccountService, useValue: accountService },
        { provide: Router, useValue: router }
      ]
    });
    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initLoginForm and initRegisterForm on ngOnInit', () => {
    // Створюємо шпіони на методи
    const initLoginFormSpy = spyOn(component, 'initLoginForm').and.callThrough();
    const initRegisterFormSpy = spyOn(component, 'initRegisterForm').and.callThrough();

    // Викликаємо ngOnInit
    component.ngOnInit();

    // Перевіряємо, що методи були викликані
    expect(initLoginFormSpy).toHaveBeenCalled();
    expect(initRegisterFormSpy).toHaveBeenCalled();
  });

  it('should toggle isLogin to false when it is true', () => {
    component.isLogin = true;
    spyOn(component, 'initLoginForm');
    spyOn(component, 'initRegisterForm');
    component.changeIsLoginStatus();
    expect(component.isLogin).toBeFalse();
    expect(component.initLoginForm).toHaveBeenCalled();
    expect(component.initRegisterForm).toHaveBeenCalled();
  });

  it('should toggle isLogin to true when it is false', () => {
    component.isLogin = false;
    spyOn(component, 'initLoginForm');
    spyOn(component, 'initRegisterForm');
    component.changeIsLoginStatus();
    expect(component.isLogin).toBeTrue();
    expect(component.initLoginForm).toHaveBeenCalled();
    expect(component.initRegisterForm).toHaveBeenCalled();
  });

  it('should initialize login form', () => {
    component.initLoginForm();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['email'].valid).toBeFalsy();
    expect(component.loginForm.controls['password'].valid).toBeFalsy();
  });

  it('should initialize register form', () => {
    component.initRegisterForm();
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.controls['firstName'].valid).toBeFalsy();
    expect(component.registerForm.controls['lastName'].valid).toBeFalsy();
    expect(component.registerForm.controls['phoneNumber'].valid).toBeFalsy();
    expect(component.registerForm.controls['email'].valid).toBeFalsy();
    expect(component.registerForm.controls['password'].valid).toBeFalsy();
    expect(component.registerForm.controls['confirmedPassword'].valid).toBeFalsy();
  });

  it('should call loginUser when isLogin=true and loginForm is valid', () => {
    component.isLogin = true;

    component.loginForm = {
      valid: true
    } as any;
    // Спостерігаємо за викликом методу loginUser
    spyOn(component, 'loginUser');

    // Викликаємо метод onSubmit()
    component.onSubmit();

    // Перевіряємо, чи був викликаний метод loginUser
    expect(component.loginUser).toHaveBeenCalled();
  });

  it('should show an error toast when isLogin=true and loginForm is invalid', () => {
    component.isLogin = true;

    component.loginForm = {
      valid: false
    } as any;
    // Викликаємо метод onSubmit()
    component.onSubmit();

    // Перевіряємо, чи був викликаний toastr.error з правильним повідомленням
    expect(toastrService.error).toHaveBeenCalledWith('login form invalid');
  });

  it('should call registerUser when isLogin is false and registerForm is valid', () => {
    component.isLogin = false;

    component.registerForm = {
      valid: true
    } as any;
    spyOn(component, 'registerUser');

    // Викликаємо метод onSubmit()
    component.onSubmit();

    // Перевіряємо, чи був викликаний метод registerUser
    expect(component.registerUser).toHaveBeenCalled();
  });

  it('should show an error toast when isLogin is false and registerForm is invalid', () => {
    component.isLogin = false;

    component.registerForm = {
      valid: false
    } as any;
    // Викликаємо метод onSubmit()
    component.onSubmit();

    // Перевіряємо, чи був викликаний toastr
    expect(toastrService.error).toHaveBeenCalledWith("register form is invalid");
  });

  it('should not call login and should show an error toastr if loginForm is invalid', () => {
    component.loginForm = {
      valid: false,
      value: { email: null, password: null }
    } as any;
    const loginSpy = spyOn(component, 'login').and.returnValue(Promise.resolve());
    component.loginUser();
    expect(loginSpy).not.toHaveBeenCalled();
    expect(toastrService.error).toHaveBeenCalledWith('Login form is invalid');
  });

  it('should call login with correct email and password if loginForm is valid', () => {
    const email = 'test@gmail.com';
    const password = 'qwerty123';
    component.loginForm = {
      valid: true,
      value: { email, password }
    } as any;
    const loginSpy = spyOn(component, 'login').and.returnValue(Promise.resolve());
    component.loginUser();
    expect(loginSpy).toHaveBeenCalledWith(email, password);
  });

  // it('should log in user and navigate to cabinet if role is USER', fakeAsync( () => {
  //   const email = 'testuser@example.com';
  //   const password = 'password123';
  //
  //   component.login(email, password);
  //   tick(); // Запускаємо асинхронні виклики
  //   fixture.detectChanges(); // Оновлюємо стан компонента після змін
  //   flushMicrotasks(); // Очищуємо чергу мікротасків
  //   // Перевіряємо, чи був викликаний navigate
  //   expect(router.navigate).toHaveBeenCalledWith(['/cabinet']);
  //   // expect(accountService.isUserLogin$.next).toHaveBeenCalledWith(true);
  // }));
});
