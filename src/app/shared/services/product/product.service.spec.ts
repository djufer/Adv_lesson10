import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";
import {getStorage, provideStorage} from "@angular/fire/storage";

describe('ProductService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage())
      ],
      providers: [ ProductsService ]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
