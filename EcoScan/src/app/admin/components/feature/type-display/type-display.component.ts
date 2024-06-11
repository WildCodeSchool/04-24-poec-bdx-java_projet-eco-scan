import { Component, inject } from '@angular/core';
import { TypeAdminService } from '../../../shared/type-admin.service';

@Component({
  selector: 'app-type-display',
  templateUrl: './type-display.component.html',
  styleUrl: './type-display.component.scss'
})
export class TypeDisplayComponent {

  private typeService = inject(TypeAdminService);
  types$ = this.typeService.getTypeList$();

}
