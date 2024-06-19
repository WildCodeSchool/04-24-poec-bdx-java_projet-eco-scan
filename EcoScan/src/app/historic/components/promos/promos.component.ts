import { Component } from '@angular/core';
import { Promo } from '../../../shared-module/models/types/Promo.type';
import { ActivatedRoute } from '@angular/router';
import { GetUser } from '../../../shared-module/models/types/GetUser.type';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrl: './promos.component.scss',
})
export class PromosComponent {
  user!: GetUser;
  redeemedPromos: Promo[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    console.log(this.user);

    this.redeemedPromos = this.user.userPromos
      .filter((promo: { redeemed: boolean }) => promo.redeemed)
      .map((promo: { promos: Promo }) => promo.promos);
  }
}
