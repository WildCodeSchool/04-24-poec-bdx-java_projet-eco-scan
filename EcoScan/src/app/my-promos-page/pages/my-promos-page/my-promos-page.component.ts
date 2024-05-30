import { Component } from '@angular/core';
import { CardService } from '../../../shared-module/shared/card.service';
import { Promo } from '../../../shared-module/models/types/Promo.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-promos-page',
  templateUrl: './my-promos-page.component.html',
  styleUrl: './my-promos-page.component.scss',
})
export class MyPromosPageComponent {
  cardList$: Observable<Promo[]> = this.cardService.getPromos$();

  constructor(private cardService: CardService) {}
}
