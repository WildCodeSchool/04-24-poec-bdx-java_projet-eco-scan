import { Component, Input, inject } from '@angular/core';
import { Brand } from '../../../../shared-module/models/types/Brand.type';
import { BrandAdminService } from '../../../shared/brand-admin.service';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.scss'
})
export class BrandCardComponent {
  
  @Input()
  brand!:Brand;

  private brandService = inject(BrandAdminService);


  deleteBrand(inBrand: Brand){
    this.brandService.deleteBrand(inBrand);
  }

}
