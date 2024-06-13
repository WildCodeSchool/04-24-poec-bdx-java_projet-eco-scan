import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Credential } from '../../../host/models/credential.type';
import { User } from '../../models/classes/User.class';
import { GetUser } from '../../models/types/getUser.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUserStocked$: BehaviorSubject<GetUser | null> =
    new BehaviorSubject<GetUser | null>(null);
  public currentUser$!: Observable<User>;

  constructor() {}

  public getCurrentUserValue$(): GetUser | null {
    return this._currentUserStocked$.value;
  }

  public setCurrentUser$(user: GetUser | null): void {
    this._currentUserStocked$.next(user);
  }

  public isLoggedIn(): boolean {
    return !!this.getCurrentUserValue$();
  }

  public verfyCredentials(
    credentials: Credential,
    user: GetUser
  ): Observable<boolean> {

    let userPassword = '';
    if (
      user.email === credentials.email &&
      userPassword === credentials.password
    ) {
      return of(true);
    }
    return of(false);
  }
}
