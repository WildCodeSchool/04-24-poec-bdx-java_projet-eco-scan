import { Component } from '@angular/core';
import { CardService } from '../../shared/card.service';
import { Observable } from 'rxjs';
import { Promo } from '../../models/types/Promo.type';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrl: './cardlist.component.scss'
})

export class CardlistComponent {

constructor(private cardService: CardService ) {}

cardList$!: Observable<Promo[]>;

ngOnInit(): void {
  this.cardList$ = this.cardService.getPromos$()
  console.log(this.cardList$)
}



}
