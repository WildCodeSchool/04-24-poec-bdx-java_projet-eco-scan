import { Injectable, inject } from '@angular/core';
import { DataAccessorService } from '../../shared-module/shared/data-accessor.service';
import { Promo } from '../../shared-module/models/types/Promo.type';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromoAdminService {

  private DBAccessor = inject(DataAccessorService);
  public promoListSubject$: BehaviorSubject<Promo[]> = new BehaviorSubject<Promo[]>([]);
  promoList$ = this.promoListSubject$.asObservable();

  constructor(){
    this.updatePromoList();
  }

  getPromoList$(): Observable<Promo[]>{
    return this.promoList$;
  }

  updatePromoList(): void{
    this.DBAccessor.getAllPromos$().subscribe(
      promos => this.promoListSubject$.next(promos)
    );
  }

  addPromo(promo: Promo): void {
    this.DBAccessor.addPromo$(promo).subscribe(
      newPromo => {
        this.updatePromoList();
      }
    );
  }

  deletePromo(promo: Promo): void{
    this.DBAccessor.deletePromo(promo).subscribe(
      newPromo => {
        this.updatePromoList();
      }
    );
  }


}
