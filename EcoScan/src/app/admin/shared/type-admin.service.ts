import { Injectable, inject } from '@angular/core';
import { TypeForm } from '../models/types/TypeForm.type';
import { DataAccessorService } from '../../shared-module/shared/services/data-accessor.service';

@Injectable({
  providedIn: 'root',
})
export class TypeAdminService {
  private DBAccessor = inject(DataAccessorService);

  createNewType(value: TypeForm) {
    //update when BE connected
  }
}
