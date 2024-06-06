import { Component, Input, inject } from '@angular/core';
import { Brand } from '../../../../shared-module/models/types/Brand.type';
import { DataAccessorService } from '../../../../shared-module/shared/data-accessor.service';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.scss'
})
export class BrandCardComponent {
  
  @Input()
  brand!:Brand;

  private dbAccessor = inject(DataAccessorService);


  deleteBrand(inBrand: Brand){
    //TODO when BE created
    // this.dbAccessor.deleteBrand(inBrand).subscribe();
  }

}
