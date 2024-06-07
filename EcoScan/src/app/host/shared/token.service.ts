import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../../shared-module/local-storage.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private _encodedTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private _decodedTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  localStorageService = inject(LocalStorageService);

  updateToken(newToken: string): void {
    console.log("######updting token");
    console.log(newToken);
    
    
    this.localStorageService.clearToken();
    this.localStorageService.setToken(newToken);
    this._encodedTokenSubject.next(newToken);
  }

  getDecodedToken$(): Observable<string> {
    return this._decodedTokenSubject.asObservable();
  }

  getEncodedToken$(): Observable<string> {
    return this._encodedTokenSubject.asObservable();
  }

  resetToken$(): void {
    this.localStorageService.clearToken();
    this._encodedTokenSubject.next("");
    this._encodedTokenSubject.next("");
  }

  decodeToken(token: string): string {
    return jwtDecode(token);
  }

}
