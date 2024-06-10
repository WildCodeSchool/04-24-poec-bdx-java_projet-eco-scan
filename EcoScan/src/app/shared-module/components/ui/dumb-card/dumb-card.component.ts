import { Component, Input } from '@angular/core';
import { Promo } from '../../../models/types/Promo.type';

import { ModalService } from '../../../shared/modal.service';

@Component({
  selector: 'app-dumb-card',
  templateUrl: './dumb-card.component.html',
  styleUrl: './dumb-card.component.scss',
})
export class DumbCardComponent {
  @Input() smallBrand: boolean = false;
  @Input() smallCard: boolean = false;
  @Input() blurCards!: boolean;
  @Input() promo!: Promo;

  constructor(private modalService: ModalService) {}

  openModal(card: Promo) {
    this.modalService.openModal(card);
    this.blurCards = false;
  }
}
