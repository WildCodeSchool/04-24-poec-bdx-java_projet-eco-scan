import { Injectable } from '@angular/core';
import { Observable, filter, map, of, switchMap, tap } from 'rxjs';
import { UserForm } from '../models/user.type';
import { AuthService } from '../../shared-module/shared-services/auth.service';
import { Credential } from '../models/crendential.type';
import { Router } from '@angular/router';
import { DataAccessorService } from '../../shared-module/shared/data-accessor.service';
import { User } from '../../shared-module/models/classes/User.class';
import { Login } from '../../shared-module/models/types/Login.type';
import { GetUser } from '../models/getUser.type';

@Injectable({
  providedIn: 'root',
})
export class HostService {
  private _baseUrl = 'http://localhost:3000';

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _dbAccessor: DataAccessorService
  ) {}

  login$(credentials: Credential): Observable<boolean> {
    console.log('jo', credentials);

    return this._dbAccessor.getAllUsers$().pipe(
      switchMap((users: GetUser[]) => {
        console.log('arr', users);

        const user = users.find((user) => user.email === credentials.email);

        console.log('YPPPPPPP', user);
        if (user) {
          this._authService.setCurrentUser$(user);
          return of(true);
          // return this._authService.verfyCredentials(credentials, user);
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

  register$(newUser: UserForm): Observable<Credential> {
    return this._dbAccessor.getAllUsers$().pipe(
      switchMap((users) => {
        const emailExists = users.some((user) => user.email === newUser.email);
        const pseudoExists = users.some(
          (user) => user.pseudo === newUser.pseudo
        );
        if (emailExists) {
          console.log('Cet email existe déjà.');
          return of(null);
        } else if (pseudoExists) {
          console.log('Ce pseudo est déjà utilisé.');
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
          console.log(user);

          return this._dbAccessor.addUser$(user).pipe(
            switchMap((addedUser) => {
              console.log('Utilisateur ajouté avec succès :', addedUser);
              const login: Login = {
                userID: addedUser.userID as string,
                salt: 'abc',
                email: newUser.email,
                hashedPassword: newUser.password,
              };
              return this._dbAccessor
                .addUserPassword$(login)
                .pipe(map(() => credentials));
            })
          );
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
