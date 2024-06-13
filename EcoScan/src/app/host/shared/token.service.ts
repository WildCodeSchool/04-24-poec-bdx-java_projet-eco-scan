import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../../shared-module/shared/services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { Token } from '../../shared-module/models/types/Token.type';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public _encodedTokenSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  public _decodedTokenSubject: BehaviorSubject<Token>=
  new BehaviorSubject<Token>({role: "", sub: ""});
  private localStorageService = inject(LocalStorageService);

  constructor() {
    const token = this.localStorageService.getToken();
    if (token) {
      this.updateToken(token);
    }
  }

  updateToken(newToken: string): void {
    this.localStorageService.clearToken();
    this.localStorageService.setToken(newToken);
    this._encodedTokenSubject.next(newToken);

    this._decodedTokenSubject.next(this.decodeToken(newToken));

  }

  getDecodedToken$(): Observable<Token> {
    return this._decodedTokenSubject.asObservable();
  }

  getEncodedToken$(): Observable<string> {
    return this._encodedTokenSubject.asObservable();
  }

  resetToken$(): void {
    this.localStorageService.clearToken();
    this._encodedTokenSubject.next('');
    this._decodedTokenSubject.next({role: "", sub: ""});
  }

  getToken(): string {
    return this._encodedTokenSubject.value;
  }

  decodeToken(token: string): Token {
    return jwtDecode(token);
  }
}
