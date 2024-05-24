import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Promo } from '../../../models/types/Promo.type';
import { Brand } from '../../../models/types/Brand.type';

@Component({
  selector: 'app-dumb-card',
  templateUrl: './dumb-card.component.html',
  styleUrl: './dumb-card.component.scss',
})
export class DumbCardComponent {
  @Input() blurCards!: boolean;
  @Input() vertical: boolean = false;
  @Input() cardList!: Promo[] | null;
  @Input() promoBrand!: Brand | null;
  @Output() openModal = new EventEmitter<Promo>();

  onOpenModal(card: Promo) {
    this.openModal.emit(card);
  }
}
