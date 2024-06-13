import { Injectable } from '@angular/core';
import { DataAccessorService } from './data-accessor.service';
import { Observable } from 'rxjs';
import { StagedRubbish } from '../../models/types/StagedRubbish.type';

@Injectable({
  providedIn: 'root',
})
export class RubbishService {
  constructor(private _dbAccess: DataAccessorService) {}

  getStaged$(id: string): Observable<StagedRubbish> {
    return this._dbAccess.getMystaged$(id);
  }
}
