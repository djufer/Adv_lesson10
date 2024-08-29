import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { promotionInfoResolver } from './promotion-info.resolver';
import { PromotionResponse } from '../../interfaces/interfaces';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('promotionInfoResolver', () => {
  const executeResolver: ResolveFn<PromotionResponse> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => promotionInfoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
