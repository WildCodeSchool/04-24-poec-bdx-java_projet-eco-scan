import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { Promo } from '../../../../shared-module/models/types/Promo.type';
import { DataAccessorService } from '../../../../shared-module/shared/data-accessor.service';
import { PromoAdminService } from '../../../shared/promo-admin.service';

@Component({
  selector: 'app-promo-admin-card',
  templateUrl: './promo-admin-card.component.html',
  styleUrl: './promo-admin-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PromoAdminCardComponent {

  @Input()
  promo!:Promo;

  //TODO add method for getting amount of promo's "bought" to
  private dbAccessor = inject(DataAccessorService);
  private promoService = inject(PromoAdminService);

  deletePromo(inPromo: Promo){
    this.promoService.deletePromo(inPromo);
  }

  suspendPromo(inPromo: Promo){
    //TODO when BE created
    // inPromo.isActive = false;
    // this.dbAccessor.updatePromo(inPromo).subscribe();

  }
}
