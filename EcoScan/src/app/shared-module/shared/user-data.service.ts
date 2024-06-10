import { Injectable, inject } from '@angular/core';
import { DataAccessorService } from './data-accessor.service';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private dataService = inject(DataAccessorService);

  getUserPoints$(id: number): Observable<number>{
    return this.dataService.getUserByID$(id).pipe(
      map(user => Number(user.points))
    );
  }
}
