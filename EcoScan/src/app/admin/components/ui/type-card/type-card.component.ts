import { Component, Input, inject } from '@angular/core';
import { Type } from '../../../../shared-module/models/types/Type.type';
import { TypeAdminService } from '../../../shared/type-admin.service';

@Component({
  selector: 'app-type-card',
  templateUrl: './type-card.component.html',
  styleUrl: './type-card.component.scss',
})
export class TypeCardComponent {
  @Input()
  type!: Type;

  private typeService = inject(TypeAdminService);

  //sql dependency constraits make this difficult, do we want to do this anyway?
  deleteType(inType: Type){
    // this.typeService.deleteType(inType);
  }
}
