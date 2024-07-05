import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { PromotionService } from './promotion.service';
import { PromotionResponse } from '../../interfaces/interfaces';

export const promotionInfoResolver: ResolveFn<PromotionResponse> = (
  route: ActivatedRouteSnapshot
) => {
  const promotionService = inject(PromotionService);

  route.paramMap.get('id');
  const id = Number(route.paramMap.get('id'));
  return promotionService.getOne(id);
};
