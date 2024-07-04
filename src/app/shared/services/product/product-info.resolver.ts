import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ProductsService } from './product.service';
import { ProductResponse } from '../../interfaces/interfaces';

export const productInfoResolver: ResolveFn<ProductResponse> = (
  route: ActivatedRouteSnapshot
) => {
  const productsService = inject(ProductsService);

  route.paramMap.get('id');
  const id = Number(route.paramMap.get('id'));
  return productsService.getOne(id);
};
