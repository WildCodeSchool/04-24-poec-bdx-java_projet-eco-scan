import { Injectable, inject } from '@angular/core';
import { DataAccessorService } from '../../shared-module/shared/data-accessor.service';
import { PromoFrom } from '../models/types/PromoForm.type';

@Injectable({
  providedIn: 'root'
})
export class PromoAdminService {
    
  private DBAccessor = inject(DataAccessorService);
  constructor() { }

  createNewPromo(newPromo: PromoFrom){
    //push to db
    // this.DBAccessor.addPromo$(newPromo);
  }

}
