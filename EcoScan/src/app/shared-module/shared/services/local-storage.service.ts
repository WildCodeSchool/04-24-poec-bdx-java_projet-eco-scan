import { Injectable } from '@angular/core';

const TOKEN:string = "token";
const USER:string = "user";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      return token;
    } else {
      return null;
    }
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN);
  }


}
