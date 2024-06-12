import { Injectable, inject } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Promo } from '../models/types/Promo.type';
import { DataAccessorService } from './data-accessor.service';
import { Brand } from '../models/types/Brand.type';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private dbAccess = inject(DataAccessorService);

  getPromos$(): Observable<Promo[]> {
    return this.dbAccess.getAllPromos$();
  }

  getBrandByName$(name: string): Observable<Brand> {
    return this.dbAccess.getBrandByName$(name);
  }

  getPromoByPercentOff$(): Observable<Promo[]> {
    return this.dbAccess.getPromoByPercentOff$();
  }

  getPromoByReleaseDate$(): Observable<Promo[]> {
    return this.dbAccess.getPromoByReleaseDate$();
  }
}
