import { Injectable, inject } from '@angular/core';
import { TokenService } from '../../../host/shared/token.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { GetUser } from '../../../host/models/getUser.type';
import { DataAccessorService } from './data-accessor.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private tokenService = inject(TokenService);
  private dataService = inject(DataAccessorService);
  private role!: string;
  private email!: string;
  private currentUser: BehaviorSubject<GetUser> = new BehaviorSubject<GetUser>(
    {} as GetUser
  );

  constructor() {
    this.tokenService.getDecodedToken$().subscribe((resp) => {
      this.role = resp.role;
      this.email = resp.sub;
      this.fetchAndSetUser();
    });
  }

  private fetchAndSetUser() {
    this.dataService
      .getUserByEmail$(this.email)
      .pipe(tap((user) => this.currentUser.next(user)))
      .subscribe();
  }

  getUser$(): Observable<GetUser> {
    if (Object.entries(this.currentUser.value).length) {
      return this.currentUser.asObservable();
    }
    return this.dataService
      .getUserByEmail$(this.email)
      .pipe(tap((user) => this.currentUser.next(user)));
  }

  refreshUser() {
    this.fetchAndSetUser();
  }

  disconnect() {
    this.currentUser.next({} as GetUser);
  }
}
