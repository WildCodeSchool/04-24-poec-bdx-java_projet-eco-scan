import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Promo } from '../../models/types/Promo.type';
import { DataAccessorService } from './data-accessor.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private dbAccess = inject(DataAccessorService);

  getPromos$(): Observable<Promo[]> {
    return this.dbAccess.getAllPromos$();
  }

  getPromoByPercentOff$(): Observable<Promo[]> {
    return this.dbAccess.getPromoByPercentOff$();
  }

  getPromoByReleaseDate$(): Observable<Promo[]> {
    return this.dbAccess.getPromoByReleaseDate$();
  }
}
