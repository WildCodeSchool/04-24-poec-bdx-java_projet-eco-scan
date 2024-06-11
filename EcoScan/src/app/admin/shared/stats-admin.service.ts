import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Promo } from '../../shared-module/models/types/Promo.type';

@Injectable({
  providedIn: 'root'
})
export class StatsAdminService {
  //dummy init data, can grab whichever brand the user manages on navigate to page instead
  emptyPromo: Promo = {
    id: 0,
    title: '',
    item: '',
    description: '',
    percentOff: 0,
    amount: 0,
    color: "",
    price: 0,
    startDate: new Date(),
    endDate: new Date(),
};
  public activePromo$: BehaviorSubject<Promo> = new BehaviorSubject<Promo>(this.emptyPromo);

  activePromo(inPromo: Promo) {
    this.activePromo$.next(inPromo);
  }

}
