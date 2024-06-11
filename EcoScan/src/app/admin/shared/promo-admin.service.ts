import { Injectable, inject } from '@angular/core';
import { DataAccessorService } from '../../shared-module/shared/services/data-accessor.service';
import { PromoForm } from '../models/types/PromoForm.type';

@Injectable({
  providedIn: 'root',
})
export class PromoAdminService {
  private DBAccessor = inject(DataAccessorService);
  constructor() {}

  createNewPromo(newPromo: PromoForm) {
    //push to db
    // this.DBAccessor.addPromo$(newPromo);
  }
}
