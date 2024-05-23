import { Component, Input } from '@angular/core';
import { CardService } from '../../../shared/card.service';
import { Observable } from 'rxjs';
import { Promo } from '../../../models/types/Promo.type';
import { Brand } from '../../../models/types/Brand.type';
import { ModalService } from '../../../shared/modal.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() blurCards!: boolean;
  @Input() vertical: boolean = false;
  cardList$: Observable<Promo[]> = this.cardService.getPromos$();
  Brands$: Observable<Brand> = this.cardService.getBrandByName$('Carrefour');

  constructor(
    private cardService: CardService,
    private modalService: ModalService,
  ) {}

  openModal(card: Promo) {
    this.modalService.openModal(card);
  }
}
