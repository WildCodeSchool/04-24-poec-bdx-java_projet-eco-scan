import { Component, Input } from '@angular/core';
import { Promo } from '../../../../shared-module/models/types/Promo.type';

@Component({
  selector: 'app-promo-admin-card',
  templateUrl: './promo-admin-card.component.html',
  styleUrl: './promo-admin-card.component.scss'
})
export class PromoAdminCardComponent {

  @Input()
  promo!:Promo;
}
