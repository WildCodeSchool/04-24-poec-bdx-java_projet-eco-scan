import { Component, inject } from '@angular/core';
import { DataAccessorService } from '../../../../shared-module/shared/services/data-accessor.service';

@Component({
  selector: 'app-promo-display',
  templateUrl: './promo-display.component.html',
  styleUrl: './promo-display.component.scss',
})
export class PromoDisplayComponent {
  private dbAccessor = inject(DataAccessorService);
  //TODO update to get promo by brands user can manage
  //once db is more established
  promos$ = this.dbAccessor.getAllPromos$();
}
