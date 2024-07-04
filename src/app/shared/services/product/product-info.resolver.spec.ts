import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productInfoResolver } from './product-info.resolver';

describe('productInfoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => productInfoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
