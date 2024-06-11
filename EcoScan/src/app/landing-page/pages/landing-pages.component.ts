import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Promo } from '../../shared-module/models/types/Promo.type';
import { CardService } from '../../shared-module/shared/services/card.service';
import { GetUser } from '../../host/models/getUser.type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrl: './landing-pages.component.scss',
})
export class LandingPagesComponent {
  cardList$!: Promo[];

  isOpen!: boolean;

  user!: GetUser;

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute
  ) {}

  onReceivedFromHeader(open: boolean): void {
    this.isOpen = open;
  }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];

    this.cardList$ = this.route.snapshot.data['promos'];
  }
}
