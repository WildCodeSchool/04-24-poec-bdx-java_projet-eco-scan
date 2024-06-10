import { Injectable, OnInit, inject } from '@angular/core';
import { TokenService } from '../../host/shared/token.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  
  private tokenService = inject(TokenService);
  private email!:string;
  
  ngOnInit(): void {
    this.tokenService.getDecodedToken$().pipe(
      tap(resp => console.log(resp)
      )
    );
  }

  getUser(){

  }

  setUser(){

  }
}


// private httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer ' + this.token
//   }),
// };
