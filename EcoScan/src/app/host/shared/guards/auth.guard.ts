import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../shared-module/shared-services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isLoggedIn = authService.isLoggedIn();
  if (isLoggedIn) {
    console.log('on utilise le guard');

    return true;
  } else {
    router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
