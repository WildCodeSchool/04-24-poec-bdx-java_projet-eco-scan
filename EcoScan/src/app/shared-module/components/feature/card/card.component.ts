import { Component, OnInit } from '@angular/core';
import { CardService } from '../../../shared/card.service';
import { Observable } from 'rxjs';
import { Promo } from '../../../models/types/Promo.type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  constructor(private cardService: CardService) {}

  cardList$!: Observable<Promo[]>;

  ngOnInit(): void {
    this.cardList$ = this.cardService.getPromos$();
  }

}
