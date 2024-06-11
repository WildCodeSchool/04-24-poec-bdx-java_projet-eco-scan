import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Promo } from '../../models/types/Promo.type';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalState: BehaviorSubject<{ visible: boolean; cardData: Promo }> =
    new BehaviorSubject<{ visible: boolean; cardData: Promo }>({
      visible: false,
      cardData: {} as Promo,
    });
  modalState$ = this.modalState.asObservable();

  constructor() {}

  openModal(cardData: Promo) {
    this.modalState.next({ visible: true, cardData });
  }

  closeModal() {
    this.modalState.next({ visible: false, cardData: {} as Promo });
  }
}
