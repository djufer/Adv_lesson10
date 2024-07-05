import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { promotionInfoResolver } from './promotion-info.resolver';

describe('promotionInfoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => promotionInfoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
