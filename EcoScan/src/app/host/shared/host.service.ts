import { Injectable } from '@angular/core';
import { Observable, filter, map, of, switchMap, tap } from 'rxjs';
import { UserForm } from '../models/user.type';
import { AuthService } from '../../shared-module/shared/auth.service';
import { Credential } from '../models/credential.type';
import { Router } from '@angular/router';
import { DataAccessorService } from '../../shared-module/shared/data-accessor.service';
import { User } from '../../shared-module/models/classes/User.class';
import { AuthResponse } from '../../shared-module/models/types/Login.type';
import { GetUser } from '../models/getUser.type';

@Injectable({
  providedIn: 'root',
})
export class HostService {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _dbAccessor: DataAccessorService
  ) {

  }

  login$(credentials: Credential): Observable<boolean> {
    return this._dbAccessor.authenticateUser$(credentials).pipe(
      switchMap((authResp: AuthResponse) => {
        if (authResp.message === "Logged In") {
          return of(true);
        } else {
          return of(false);
        }
      }
      ),
      tap((isLoggedIn) => {
        if (isLoggedIn) {
          this._router.navigate(['/home']);
        }
      })
    );
  }

  register$(newUser: UserForm): Observable<Credential> {
    return this._dbAccessor.getAllUsers$().pipe(
      switchMap((users) => {
        const emailExists = users.some((user) => user.email === newUser.email);
        const pseudoExists = users.some(
          (user) => user.pseudo === newUser.pseudo
        );
        if (emailExists) {
          // email exist toast
          return of(null);
        } else if (pseudoExists) {
          // pseudo exist toast
          return of(null);
        } else {
          const credentials: Credential = {
            email: newUser.email,
            password: newUser.password,
          };

          const user = new User(
            undefined,
            newUser.firstname,
            newUser.lastname,
            newUser.pseudo,
            newUser.email,
            newUser.points,
            newUser.isAdmin
          );
          return of(credentials);

          // return this._dbAccessor.addUser$(user).pipe(
          //   switchMap((addedUser) => {
          //     //  Success register toast
          //     const login: RegisterResponse = {
          //       message: addedUser.getUserID() as string,
          //       salt: 'abc',
          //       email: newUser.email,
          //       hashedPassword: newUser.password,
          //     };
          //     return this._dbAccessor
          //       .addUserPassword$(login)
          //       .pipe(map(() => credentials));
          //   })
          // );
        }
      }),
      map((userOrNull) => {
        if (userOrNull === null) {
          throw new Error("L'utilisateur est null.");
        } else {
          return userOrNull;
        }
      })
    );
  }

  logout(): void {
    this._authService.setCurrentUser$(null);
    this._router.navigate(['']);
  }
}
