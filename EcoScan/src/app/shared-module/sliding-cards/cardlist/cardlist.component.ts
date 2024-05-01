import { Component, inject } from '@angular/core';
import { CardService } from '../../shared/card.service';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrl: './cardlist.component.scss'
})
export class CardlistComponent {

  promoCardList$: any = inject(CardService).getPromos$()

}
