import { Injectable, inject } from '@angular/core';
import { DataAccessorService } from '../../shared-module/shared/services/data-accessor.service';
import { BrandForm } from '../models/types/BrandForm.type';

@Injectable({
  providedIn: 'root',
})
export class BrandAdminService {
  private DBAccessor = inject(DataAccessorService);
  constructor() {}

  createNewBrand(newBrand: BrandForm) {
    //push to db
    // this.DBAccessor.addPromo$(newBrand);
  }
}
