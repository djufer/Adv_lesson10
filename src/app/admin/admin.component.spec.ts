import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from '../shared/services/account/account.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let routerMock: jasmine.SpyObj<Router>;
  let accountServiceMock: jasmine.SpyObj<AccountService>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    accountServiceMock = jasmine.createSpyObj('AccountService', ['isUserLogin$'], {
      isUserLogin$: of(true),
    });

    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]), // Додаємо порожні маршрути для тестування
      ],
      providers: [
        { provide: Firestore, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: Router, useValue: routerMock },
        { provide: AccountService, useValue: accountServiceMock },
      ]
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
