import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartModalComponent } from './cart-modal.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';
import { getAuth } from '@firebase/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';

describe('CartModalComponent', () => {
  let component: CartModalComponent;
  let fixture: ComponentFixture<CartModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartModalComponent],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage())
      ],
      providers: [
        { provide: ToastrService, useValue: {} }, // Мок для ToastrService
      ]
    });
    fixture = TestBed.createComponent(CartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
