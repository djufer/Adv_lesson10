import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDataComponent } from './personal-data.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import {AccountService} from "../../../shared/services/account/account.service";

describe('PersonalDataComponent', () => {
  let component: PersonalDataComponent;
  let fixture: ComponentFixture<PersonalDataComponent>;

  beforeEach(() => {
    let mockAccountService = jasmine.createSpyObj('AccountService', ['updatePersonalData']);
    TestBed.configureTestingModule({
      declarations: [PersonalDataComponent],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: AccountService, useValue: mockAccountService  },
        { provide: Firestore, useValue: {} }, // Мок для Firestore
        { provide: Auth, useValue: {} }, // Мок для Auth
        { provide: ToastrService, useValue: {} }, // Мок для ToastrService
      ]

    });
    fixture = TestBed.createComponent(PersonalDataComponent);
    component = fixture.componentInstance;
    // Мок даних для currentUser
    component.currentUser = {
      personalData: {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        email: 'john.doe@example.com',
      },
      // додайте інші поля, якщо необхідно
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
