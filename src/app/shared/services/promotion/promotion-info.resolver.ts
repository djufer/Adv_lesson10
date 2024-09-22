import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { PromotionService } from './promotion.service';
import { PromotionResponse } from '../../interfaces/interfaces';

export const promotionInfoResolver: ResolveFn<Promise<PromotionResponse | null>> = (
  route: ActivatedRouteSnapshot
) => {
  const promotionService = inject(PromotionService);
  const id = route.paramMap.get('id');

  return id ? promotionService.getOneFirebase(id) : Promise.resolve(null);
};

