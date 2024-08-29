import { TestBed } from '@angular/core/testing';
import { ImageService } from './image.service';
import { environment } from '../../../../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)), // Ініціалізація Firebase App
        provideStorage(() => getStorage()), // Ініціалізація Storage
      ],
    }).compileComponents();

    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
