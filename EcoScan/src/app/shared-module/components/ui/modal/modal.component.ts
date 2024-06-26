import {
  Component,
  HostListener,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { DataAccessorService } from '../../../shared/services/data-accessor.service';
import { UserService } from '../../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { GetUser } from '../../../models/types/GetUser.type';
import { Promo } from '../../../models/types/Promo.type';
import { Modal } from '../../../models/types/Modal.type';
import { ModalService } from '../../../shared/services/modal.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
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
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
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

  confirm(event: Event, promoId: number, promoPrice: number) {
    const target = event.target as HTMLElement;
    if (!target) {
      console.error('Event target is null');
      return;
    }

    const remainingPoints = this.user.points - promoPrice;
    this.confirmationService.confirm({
      target: target,
      message: `Êtes-vous sûr de vouloir acheter cette promotion ?
       ${this.user.points} - ${promoPrice} = ${remainingPoints} points restant`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmer',
      rejectLabel: 'Annuler',
      accept: () => {
        this.buyPromo(promoId);
      },
    });
  }

  buyPromo(promoId: number) {
    this.dbAccess.addUserPromo$(this.user.id, promoId).subscribe((res) => {
      this.userService.refreshUser();
      this.dbAccess.getAllPromos$().subscribe((updatedPromos: Promo[]) => {
        this.modalService.updatePromoList(updatedPromos);
        this.dbAccess.getPromoByPercentOff$().subscribe((promosByPercent) => {
          this.modalService.updatePromoListByPercentOff(promosByPercent);
        });
        this.dbAccess.getPromoByReleaseDate$().subscribe((promosByDate) => {
          this.modalService.updatePromoListByReleasedDate(promosByDate);
        });
      });
      this.modalService.closeModal();
    });
  }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
  }
}
