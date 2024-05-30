import { Component, inject } from '@angular/core';
import { StatsAdminService } from '../../../shared/stats-admin.service';
import { Observable } from 'rxjs';
import { Promo } from '../../../../shared-module/models/types/Promo.type';

@Component({
  selector: 'app-stats-display',
  templateUrl: './stats-display.component.html',
  styleUrl: './stats-display.component.scss'
})
export class StatsDisplayComponent {

  private service = inject(StatsAdminService)
  activeStat$: Observable<Promo> = this.service.activePromo$;

}
