import { Component } from '@angular/core';
import { CardService } from '../../../shared-module/shared/services/card.service';
import { Promo } from '../../../shared-module/models/types/Promo.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrl: './promos.component.scss',
})
export class PromosComponent {
  cardList$: Observable<Promo[]> = this.cardService.getPromos$();

  constructor(private cardService: CardService) {}
}
