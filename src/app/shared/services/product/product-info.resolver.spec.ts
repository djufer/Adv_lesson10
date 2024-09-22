import { TestBed } from '@angular/core/testing';
import {ProductsService} from "./product.service";

describe('productInfoResolver', () => {
    let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductsService', ['getOneFirebase']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ProductsService, useValue: spy },
      ],
    });

    productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
  });

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductsService', ['getOneFirebase']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ProductsService, useValue: spy },
      ],
    });

    productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
  });
});
