import { Component, OnInit } from '@angular/core';
import { CardService } from '../../../shared/card.service';
import { Observable } from 'rxjs';
import { Promo } from '../../../models/types/Promo.type';
import { Brand } from '../../../models/types/Brand.type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  constructor(private cardService: CardService) {}

  cardList$!: Observable<Promo[]>;

  carrefourBrand$!: Observable<Brand>;

  ngOnInit(): void {
    this.cardList$ = this.cardService.getPromos$();
    this.carrefourBrand$ = this.cardService.getBrandByName$("Carrefour");
  }

}
