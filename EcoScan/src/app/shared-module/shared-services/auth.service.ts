import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Users } from '../../host/models/user.type';
import { Credential } from '../../host/models/crendential.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUserStocked$: BehaviorSubject<Users | null> =
    new BehaviorSubject<Users | null>(null);
  public currentUser$!: Observable<Users>;

  constructor() {}

  public getCurrentUserValue$(): Users | null {
    return this._currentUserStocked$.value;
  }

  public setCurrentUser$(user: Users | null): void {
    this._currentUserStocked$.next(user);
  }

  public isLoggedIn(): boolean {
    return !!this.getCurrentUserValue$();
  }

  public verfyCredentials(
    credentials: Credential,
    user: Users
  ): Observable<boolean> {
    if (
      user.email === credentials.email &&
      user.password === credentials.password
    ) {
      return of(true);
    }
    return of(false);
  }
}
