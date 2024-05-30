import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { Promo } from '../../../../shared-module/models/types/Promo.type';
import { DataAccessorService } from '../../../../shared-module/shared/data-accessor.service';

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


  deletePromo(inPromo: Promo){
    //TODO when BE created
    // this.dbAccessor.deletePromo(inPromo).subscribe();
  }

  suspendPromo(inPromo: Promo){
    //TODO when BE created
    // inPromo.isActive = false;
    // this.dbAccessor.updatePromo(inPromo).subscribe();

  }
}
