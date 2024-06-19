import { Injectable, inject } from '@angular/core';
import { DataAccessorService } from '../../shared-module/shared/services/data-accessor.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  
  private dbAccess = inject(DataAccessorService);

  constructor() { }


  getAllBinTypes$(): Observable<string[]>{
    return this.dbAccess.getAllTypeNames$();
  }

}
