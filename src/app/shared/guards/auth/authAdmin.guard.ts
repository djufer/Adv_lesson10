import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROLE } from '../../constants/role.constant';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  if (currentUser && currentUser.personalData.role === ROLE.ADMIN) {
    return true;
  }
  inject(Router).navigate(['']);
  return false;  
};
export const authUserGuard: CanActivateFn = (route, state) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  if (currentUser && currentUser.personalData.role === ROLE.USER) {
    return true;
  }
  inject(Router).navigate(['']);
  return false;  
};
