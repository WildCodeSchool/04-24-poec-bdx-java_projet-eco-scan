import { Injectable, OnInit, inject } from '@angular/core';
import { TokenService } from '../../host/shared/token.service';
import { Observable, tap } from 'rxjs';
import { GetUser } from '../../host/models/getUser.type';
import { DataAccessorService } from './data-accessor.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private tokenService = inject(TokenService);
  private dataService = inject(DataAccessorService);
  private role!:string;
  private email!:string;

  public user!:GetUser;
  
  constructor() {
    this.tokenService.getDecodedToken$().subscribe(
      resp => {
        this.role = resp.role;
        this.email = resp.sub;
    });
  }

  getUser$(): Observable<GetUser> {
    return this.dataService.getUserByEmail$(this.email);
  }
}
