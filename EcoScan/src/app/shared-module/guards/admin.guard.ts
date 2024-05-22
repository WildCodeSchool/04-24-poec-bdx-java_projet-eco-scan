import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  // if (authService.getCurrentUserValue$() !== null){
  //   console.log(authService.getCurrentUserValue$());
  //   return authService.getCurrentUserValue$()?.isAdmin as boolean;
  // }
  // router.navigate(['/'], { queryParams: { returnUrl: state.url } });
  // return false;
  return true;
};
