import { Component, inject } from '@angular/core';
import { DataAccessorService } from '../../../../shared-module/shared/services/data-accessor.service';
import { StatsAdminService } from '../../../shared/stats-admin.service';
import { Promo } from '../../../../shared-module/models/types/Promo.type';

@Component({
  selector: 'app-promo-id-display',
  templateUrl: './promo-id-display.component.html',
  styleUrl: './promo-id-display.component.scss',
})
export class PromoIdDisplayComponent {
  private dbAccessor = inject(DataAccessorService);
  private statsService = inject(StatsAdminService);

  //TODO update to get promo by brands user can manage
  //once db is more established
  promos$ = this.dbAccessor.getAllPromos$();

  selectedPromo(promo: Promo) {
    this.statsService.activePromo(promo);
  }
}
