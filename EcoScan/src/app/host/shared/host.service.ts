import { Injectable, inject } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { UserForm } from '../models/user.type';
import { AuthService } from '../../shared-module/shared/auth.service';
import { Credential } from '../models/credential.type';
import { Router } from '@angular/router';
import { DataAccessorService } from '../../shared-module/shared/data-accessor.service';
import { AuthResponse } from '../../shared-module/models/types/Login.type';
import { TokenService } from './token.service';
import { UserService } from '../../shared-module/shared/user.service';

@Injectable({
  providedIn: 'root',
})
export class HostService {
  userService = inject(UserService);

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _dbAccessor: DataAccessorService,
    private _tokenService: TokenService
  ) {}

  login$(credentials: Credential): Observable<boolean> {
    return this._dbAccessor.authenticateUser$(credentials).pipe(
      switchMap((authResp: AuthResponse) => {
        if (authResp.message) {
          this._tokenService.updateToken(authResp.token);
          return of(true);
        } else {
          return of(false);
        }
      }),
      tap((isLoggedIn) => {
        if (isLoggedIn) {
          this._router.navigate(['/home']);
        }
      })
    );
  }

  register$(newUser: UserForm): Observable<boolean> {
    return this._dbAccessor.addUserAndLogin$(newUser).pipe(
      switchMap(() => {
        const credentials: Credential = {
          email: newUser.email,
          password: newUser.password,
        };
        return this.login$(credentials);
      })
    );
  }

  logout(): void {
    this._authService.setCurrentUser$(null);
    this._tokenService.resetToken$();
    this._router.navigate(['']);
  }
}
