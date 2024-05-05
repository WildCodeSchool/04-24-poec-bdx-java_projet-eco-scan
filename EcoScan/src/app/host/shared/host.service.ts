import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Users } from '../models/user.type';
import { AuthService } from '../../shared-module/shared-services/auth.service';
import { Credential } from '../models/crendential.type';

@Injectable({
  providedIn: 'root',
})
export class HostService {
  private _baseUrl = 'http://localhost:3000';

  constructor(private _http: HttpClient, private _authService: AuthService) {}

  getUsers$(): Observable<Users[]> {
    return this._http.get<Users[]>(`${this._baseUrl}/users`);
  }

  postUser$(user: Users): Observable<Users> {
    return this._http.post<Users>(`${this._baseUrl}/users`, user);
  }

  login$(credentials: Credential): Observable<boolean> {
    return this.getUsers$().pipe(
      switchMap((users) => {
        const user = users.find((user) => user.email === credentials.email);
        if (user) {
          return this._authService.verfyCredentials(credentials, user);
        } else {
          return of(false);
        }
      })
    );
  }

  // register$(newUser: Users): Observable<Users> {
  //   console.log('yaaaaaaaaa', newUser);

  //   return this.getUsers$().pipe(
  //     switchMap((users) => {
  //       console.log('yoooooooooo', users);

  //       const emailExists = users.some((user) => user.email === newUser.email);
  //       const pseudoExists = users.some(
  //         (user) => user.pseudo === newUser.pseudo
  //       );
  //       if (emailExists) {
  //         console.log('Cet email existe déjà.');
  //         return of(null);
  //       } else if (pseudoExists) {
  //         console.log('Ce pseudo est déjà utilisé.');
  //         return of(null);
  //       } else {
  //         return this.postUser$(newUser as Users);
  //       }
  //     }),
  //   );
  // }

  logout(): Observable<Users> {
    return this._http.post<Users>(`${this._baseUrl}/users`, {});
  }
}