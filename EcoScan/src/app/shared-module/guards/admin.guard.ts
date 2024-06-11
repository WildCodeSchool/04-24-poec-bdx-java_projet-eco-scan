import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  //**********************
  //****just while auth service is skipped
  //**********************

  // const router = inject(Router);
  // const authService = inject(AuthService);
  // if (authService.getCurrentUserValue$() !== null){
  //   console.log(authService.getCurrentUserValue$());
  //   return authService.getCurrentUserValue$()?.isAdmin as boolean;
  // }
  // console.log(authService.getCurrentUserValue$());
  // router.navigate(['/'], { queryParams: { returnUrl: state.url } });
  // return false;
  return true;
};
