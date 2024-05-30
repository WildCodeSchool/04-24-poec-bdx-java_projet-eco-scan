import { Injectable } from '@angular/core';
import { DataAccessorService } from './data-accessor.service';
import { Observable } from 'rxjs';
import { Rubbish } from '../models/types/Rubbish.type';

@Injectable({
  providedIn: 'root',
})
export class RubbishService {
  constructor(private _dbAccess: DataAccessorService) {}

  getRubbish(): Observable<Rubbish[]> {
    return this._dbAccess.getAllRubbish$();
    // From User
  }
}
