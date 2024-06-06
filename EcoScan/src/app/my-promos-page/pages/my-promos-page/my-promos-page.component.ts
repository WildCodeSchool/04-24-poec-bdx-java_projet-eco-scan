import { Component } from '@angular/core';
import { CardService } from '../../../shared-module/shared/card.service';
import { Promo } from '../../../shared-module/models/types/Promo.type';
import { Observable } from 'rxjs';
import {
  openClosePageAnimation,
  openPageAnimation,
} from '../../../shared-module/shared/route-animations';

@Component({
  selector: 'app-my-promos-page',
  templateUrl: './my-promos-page.component.html',
  styleUrls: ['./my-promos-page.component.scss'],
  animations: [openClosePageAnimation, openPageAnimation],
})
export class MyPromosPageComponent {
  cardList$: Observable<Promo[]> = this.cardService.getPromos$();

  constructor(private cardService: CardService) {}
}
