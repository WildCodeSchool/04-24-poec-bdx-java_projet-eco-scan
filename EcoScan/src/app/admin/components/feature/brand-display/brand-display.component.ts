import { Component, inject } from '@angular/core';
import { BrandAdminService } from '../../../shared/brand-admin.service';

@Component({
  selector: 'app-brand-display',
  templateUrl: './brand-display.component.html',
  styleUrl: './brand-display.component.scss',
})
export class BrandDisplayComponent {

  private brandService = inject(BrandAdminService);
  brands$ = this.brandService.getBrandList$();

}
