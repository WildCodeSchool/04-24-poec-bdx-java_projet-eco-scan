import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { UserForm } from '../../host/models/user.type';
import { Credential } from '../../host/models/crendential.type';
import { User } from '../models/classes/User.class';
import { DataAccessorService } from '../shared/data-accessor.service';
import { GetUser } from '../../host/models/getUser.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUserStocked$: BehaviorSubject<GetUser | null> =
    new BehaviorSubject<GetUser | null>(null);
  public currentUser$!: Observable<User>;

  constructor(private _dbAccessor: DataAccessorService) {}

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

    // TODO

    // this._dbAccessor
    //   .getUserLogin$(user.id)
    //   .pipe(map((login) => (userPassword = login.hashedPassword)))

    if (
      user.email === credentials.email &&
      userPassword === credentials.password
    ) {
      return of(true);
    }
    return of(false);
  }
}
