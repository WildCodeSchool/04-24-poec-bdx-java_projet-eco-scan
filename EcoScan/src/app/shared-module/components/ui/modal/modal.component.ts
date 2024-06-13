import { Component, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../../shared/services/modal.service';
import { Observable } from 'rxjs';
import { Modal } from '../../../models/types/modal.type';
import { DataAccessorService } from '../../../shared/services/data-accessor.service';
import { UserService } from '../../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { GetUser } from '../../../../host/models/getUser.type';
import { Promo } from '../../../models/types/Promo.type';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  modalState$: Observable<Modal>;
  user!: GetUser;

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private dbAccess: DataAccessorService,
    private route: ActivatedRoute
  ) {
    this.modalState$ = this.modalService.modalState$;
  }

  hideDialog() {
    this.modalService.closeModal();
  }

  buyPromo(promoId: number) {
    this.dbAccess.addUserPromo$(this.user.id, promoId).subscribe((res) => {
      console.log('promo added', res);
      this.userService.refreshUser();

      // Fetch updated promo list
      this.dbAccess.getAllPromos$().subscribe((updatedPromos: Promo[]) => {
        this.modalService.updatePromoList(updatedPromos);
      });

      this.modalService.closeModal();
    });
  }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
  }
}
