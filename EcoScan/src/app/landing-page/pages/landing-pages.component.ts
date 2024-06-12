import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Promo } from '../../shared-module/models/types/Promo.type';
import { CardService } from '../../shared-module/shared/card.service';

@Component({
  selector: 'app-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrl: './landing-pages.component.scss',
})
export class LandingPagesComponent {
  cardList2$: Observable<Promo[]> = this.cardService.getPromos$();
  cardListByPercentOff$: Observable<Promo[]> =
    this.cardService.getPromoByPercentOff$();

  cardListByReleasedDate: Observable<Promo[]> =
    this.cardService.getPromoByReleaseDate$();

  isOpen!: boolean;

  constructor(private cardService: CardService) {}

  onReceivedFromHeader(open: boolean): void {
    this.isOpen = open;
  }
}
