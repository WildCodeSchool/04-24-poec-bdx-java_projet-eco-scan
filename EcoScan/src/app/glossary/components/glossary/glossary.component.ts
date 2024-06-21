import { Component } from '@angular/core';
import { Type } from '../../../shared-module/models/types/Type.type';
import { DataAccessorService } from '../../../shared-module/shared/services/data-accessor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrl: './glossary.component.scss',
})
export class GlossaryComponent {
  typeCard$: Observable<Type[]> = this._dbAccess.getAllTypes$();
  newCard!: Type;

  constructor(private _dbAccess: DataAccessorService) {}

  ngOnInit() {
    this.newCard = {
      id: 1154,
      name: 'Telephone',
      pictogram: '',
      pathOfImage: '',
      points: 1000,
      description: 'yoooo',
      bins: []
    };
  }
}
