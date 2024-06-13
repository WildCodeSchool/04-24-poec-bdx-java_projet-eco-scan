import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Credential } from '../../../host/models/credential.type';
import { GetUser } from '../../models/types/GetUser.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
