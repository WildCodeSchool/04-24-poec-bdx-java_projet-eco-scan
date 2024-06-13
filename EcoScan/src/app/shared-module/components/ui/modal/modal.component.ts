import { Component, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../../shared/services/modal.service';
import { Observable } from 'rxjs';
import { Modal } from '../../../models/types/Modal.type';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  modalState$: Observable<Modal>;

  constructor(private modalService: ModalService) {
    this.modalState$ = this.modalService.modalState$;
  }

  hideDialog() {
    this.modalService.closeModal();
  }
}
