import { Component, inject } from '@angular/core';
import { DataAccessorService } from '../../../../shared-module/shared/services/data-accessor.service';

@Component({
  selector: 'app-brand-display',
  templateUrl: './brand-display.component.html',
  styleUrl: './brand-display.component.scss',
})
export class BrandDisplayComponent {
  private dbAccessor = inject(DataAccessorService);
  brands$ = this.dbAccessor.getAllBrands$();
}
