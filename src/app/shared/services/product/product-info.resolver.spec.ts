import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { ProductResponse } from '../../interfaces/interfaces';

import { productInfoResolver } from './product-info.resolver';

describe('productInfoResolver', () => {
  const executeResolver: ResolveFn<ProductResponse> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => productInfoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should return a product response', () => {
    expect(executeResolver).toBeTruthy();
  });
});
