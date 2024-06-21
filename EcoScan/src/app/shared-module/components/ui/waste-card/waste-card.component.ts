import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Rubbish } from '../../../models/types/Rubbish.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waste-card',
  templateUrl: './waste-card.component.html',
  styleUrl: './waste-card.component.scss',
})
export class WasteCardComponent {
  @Input()
  rubbish!: Rubbish;

  @Input()
  isThrow: boolean = false;

  @Input()
  isBinClose: boolean = false;

  private router = inject(Router);

  navToMap() {
    this.router.navigate([`/map/${this.rubbish.type.name}`]);
  }

  throwWaste() {
    if (this.isBinClose) {
      console.log('Trash successfully thrown');
      // Supposons que vous avez une méthode pour supprimer de `staged waste` et ajouter à `deposit`
      // this.scanService
      //   .sendDeposit$({
      //     /* propriétés de dépôt */
      //   })
      //   .subscribe(() => {
      //     // Actualisez votre UI, supprimez de staged waste, etc.
      //   });
    }
  }
}
