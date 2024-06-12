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
  private email!: string;
  private currentRole: BehaviorSubject<string> = new BehaviorSubject<string>(
    ""
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
    });
  }

  getUser$(): Observable<GetUser> {
    if (Object.entries(this.currentUser.value).length) {
      return this.currentUser.asObservable();
    }
    return this.dataService
      .getUserByEmail$(this.email)
      .pipe(tap((user) => this.currentUser.next(user)));
  }

  getRole$(): Observable<string>{
    if (!Object.entries(this.currentRole.value).length) {
        this.fetchTokenData();
    }
    return this.currentRole.asObservable();
  }

}
