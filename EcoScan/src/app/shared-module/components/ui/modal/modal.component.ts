import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, Component, ViewEncapsulation } from '@angular/core';
import { Promo } from '../../../models/types/Promo.type';
import { ModalService } from '../../../shared/modal.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    encapsulation: ViewEncapsulation.None,
    // schemas: [NO_ERRORS_SCHEMA]
})
export class ModalComponent {
  modalState$: Observable<{ visible: boolean, cardData: Promo | null }>;

  constructor(private modalService: ModalService) {
    this.modalState$ = this.modalService.modalState$;
  }

  hideDialog() {
    this.modalService.closeModal();
  }
}