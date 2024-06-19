import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { of, switchMap } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.getRole$().pipe(
    switchMap((role: string) => {
      if (role !== "ROLE_ADMIN"){
        router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return of(false);
      }
      return of(true);
    })
  );
};
