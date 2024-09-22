import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ProductsService } from './product.service';
import { ProductResponse } from '../../interfaces/interfaces';

export const productInfoResolver: ResolveFn<ProductResponse | null> = (
  route: ActivatedRouteSnapshot
) => {
  const productsService = inject(ProductsService);
  const id = route.paramMap.get('id');
  return id ? productsService.getOneById(id) : Promise.resolve(null);
};
