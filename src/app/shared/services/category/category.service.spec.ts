import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../../environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage()),
        provideFirestore(() => getFirestore())
      ],
      providers: [
        CategoryService
      ]
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
