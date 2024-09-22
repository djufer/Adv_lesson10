import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselComponent } from './carrusel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

describe('CarruselComponent', () => {
  let component: CarruselComponent;
  let fixture: ComponentFixture<CarruselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselComponent],
      imports: [
        HttpClientTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()), // Додаємо провайдер для Firestore
      ]
    });
    fixture = TestBed.createComponent(CarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
