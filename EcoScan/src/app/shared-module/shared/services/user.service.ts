import { Injectable, inject } from '@angular/core';
import { TokenService } from '../../../host/shared/token.service';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { GetUser } from '../../models/types/GetUser.type';
import { DataAccessorService } from './data-accessor.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private tokenService = inject(TokenService);
  private dataService = inject(DataAccessorService);
  private email!: string;
  private currentRole: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private currentUser: BehaviorSubject<GetUser> = new BehaviorSubject<GetUser>(
    {} as GetUser
  );

  constructor() {
    this.fetchTokenData();
  }

  fetchTokenData() {
    this.tokenService.getDecodedToken$().subscribe((resp) => {
      this.currentRole.next(resp.role);
      this.email = resp.sub;
      this.fetchAndSetUser();
    });
  }

  private fetchAndSetUser() {
    this.dataService
      .getUserByEmail$(this.email)
      .pipe(tap((user) => this.setUser(user)))
      .subscribe();
  }

  getUser$(): Observable<GetUser> {
    return this.dataService.getUserByEmail$(this.email).pipe(
      tap((user) => this.currentUser.next(user)),
      switchMap(() => this.currentUser.asObservable())
    );
  }

  setUser(user: GetUser): void {
    const points = user.points;
    const newUser = this.currentUser.value;
    this.currentUser.next({ ...newUser, points });
  }

  getRole$(): Observable<string> {
    if (!Object.entries(this.currentRole.value).length) {
      this.fetchTokenData();
    }
    return this.currentRole.asObservable();
  }

  refreshUser() {
    this.fetchAndSetUser();
  }

  disconnect() {
    this.currentUser.next({} as GetUser);
  }
}
