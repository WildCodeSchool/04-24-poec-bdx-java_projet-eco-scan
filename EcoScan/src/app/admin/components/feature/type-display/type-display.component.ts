import { Component, inject } from '@angular/core';
import { DataAccessorService } from '../../../../shared-module/shared/data-accessor.service';

@Component({
  selector: 'app-type-display',
  templateUrl: './type-display.component.html',
  styleUrl: './type-display.component.scss'
})
export class TypeDisplayComponent {

  private dbAccessor = inject(DataAccessorService);
  types$ = this.dbAccessor.getAllTypes$();

}
