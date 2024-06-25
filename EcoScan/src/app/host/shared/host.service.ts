import { Injectable } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { UserForm } from '../models/user.type';
import { Credential } from '../models/credential.type';
import { Router } from '@angular/router';
import { DataAccessorService } from '../../shared-module/shared/services/data-accessor.service';
import { AuthResponse } from '../../shared-module/models/types/Login.type';
import { TokenService } from './token.service';
import { UserService } from '../../shared-module/shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class HostService {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _dbAccessor: DataAccessorService,
    private _tokenService: TokenService,
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
          const decodedToken = this._tokenService.decodeToken(
            this._tokenService.getToken(),
          );
          const userRole = decodedToken.role;

          if (userRole === 'ROLE_ADMIN') {
            this._router.navigate(['/admin']);
          } else {
            this._router.navigate(['/home']);
          }
        }
      }),
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
      }),
    );
  }

  logout(): void {
    this._userService.disconnect();
    this._tokenService.resetToken$();
    this._router.navigate(['']);
  }
}
