import { Component } from '@angular/core';
import { Promo } from '../../shared-module/models/types/Promo.type';
import { GetUser } from '../../shared-module/models/types/GetUser.type';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { UserService } from '../../shared-module/shared/services/user.service';
import { ModalService } from '../../shared-module/shared/services/modal.service';
import { CardService } from '../../shared-module/shared/services/card.service';

@Component({
  selector: 'app-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrl: './landing-pages.component.scss',
})
export class LandingPagesComponent {
  cardList$!: Observable<Promo[]>;
  cardListByPercentOff$: Observable<Promo[]> =
    this.cardService.getPromoByPercentOff$();

  cardListByReleasedDate: Observable<Promo[]> =
    this.cardService.getPromoByReleaseDate$();

  isOpen!: boolean;

  user$: Observable<GetUser> = this.userService.getUser$();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private modalService: ModalService,
    private cardService: CardService
  ) {}

  onReceivedFromHeader(open: boolean): void {
    this.isOpen = open;
  }

  ngOnInit() {
    this.cardList$ = this.route.data.pipe(
      map((data) => data['promos']),
      switchMap((initialPromos) =>
        this.modalService.promoList$.pipe(
          map((updatedPromos) =>
            updatedPromos.length ? updatedPromos : initialPromos
          )
        )
      )
    );
  }
}
