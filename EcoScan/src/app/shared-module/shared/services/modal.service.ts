import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Modal } from '../../models/types/Modal.type';
import { Promo } from '../../models/types/Promo.type';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalState: BehaviorSubject<Modal> = new BehaviorSubject<Modal>({
    visible: false,
    cardData: {} as Promo,
  });
  modalState$ = this.modalState.asObservable();

  private promoListSubject = new BehaviorSubject<Promo[]>([]);
  promoList$ = this.promoListSubject.asObservable();

  private promoListByPercentOffSubject = new BehaviorSubject<Promo[]>([]);
  promoListByPercentOff$ = this.promoListByPercentOffSubject.asObservable();

  private promoListByReleasedDateSubject = new BehaviorSubject<Promo[]>([]);
  promoListByReleasedDate$ = this.promoListByReleasedDateSubject.asObservable();

  constructor() {}

  openModal(cardData: Promo) {
    this.modalState.next({ visible: true, cardData });
  }

  closeModal() {
    this.modalState.next({ visible: false, cardData: {} as Promo });
  }

  updatePromoList(newPromos: Promo[]) {
    this.promoListSubject.next(newPromos);
  }

  updatePromoListByPercentOff(newPromos: Promo[]) {
    this.promoListByPercentOffSubject.next(newPromos);
  }

  updatePromoListByReleasedDate(newPromos: Promo[]) {
    this.promoListByReleasedDateSubject.next(newPromos);
  }
}
