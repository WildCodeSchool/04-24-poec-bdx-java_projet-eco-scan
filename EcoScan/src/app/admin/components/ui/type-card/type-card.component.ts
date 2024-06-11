import { Component, Input, inject } from '@angular/core';
import { Type } from '../../../../shared-module/models/types/Type.type';
import { DataAccessorService } from '../../../../shared-module/shared/services/data-accessor.service';

@Component({
  selector: 'app-type-card',
  templateUrl: './type-card.component.html',
  styleUrl: './type-card.component.scss',
})
export class TypeCardComponent {
  @Input()
  type!: Type;

  private dbAccessor = inject(DataAccessorService);

  deleteType(inBrand: Type) {
    //TODO when BE created
    // this.dbAccessor.deleteBrand(inBrand).subscribe();
  }
}
