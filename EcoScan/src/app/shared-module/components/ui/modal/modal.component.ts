import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../../shared/services/Modal.service';
import { Observable, tap } from 'rxjs';
import { DataAccessorService } from '../../../shared/services/data-accessor.service';
import { UserService } from '../../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { GetUser } from '../../../models/types/GetUser.type';
import { Promo } from '../../../models/types/Promo.type';
import { Modal } from '../../../models/types/Modal.type';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (event.target.className.includes('p-dialog-mask')) {
      this.modalService.closeModal();
    }
  }

  @Input()
  showCode: boolean = false;

  user!: GetUser;
  modalState$: Observable<Modal> = this.modalService.modalState$;

  showCodePromo: boolean = false;
  promoCode: string | null = null;

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private dbAccess: DataAccessorService,
    private route: ActivatedRoute
  ) {}

  generatePromoCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 10; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  showPromoCode() {
    if (this.showCodePromo) {
      this.showCodePromo = false;
      this.promoCode = null;
    } else {
      this.promoCode = this.generatePromoCode();
      this.showCodePromo = true;
    }
  }

  hideDialog() {
    this.modalService.closeModal();
  }

  buyPromo(promoId: number) {
    this.dbAccess.addUserPromo$(this.user.id, promoId).subscribe((res) => {
      this.userService.refreshUser();
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
