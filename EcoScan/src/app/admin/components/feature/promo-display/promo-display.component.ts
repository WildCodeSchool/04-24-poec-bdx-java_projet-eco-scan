import { Component, OnInit, inject } from '@angular/core';
import { PromoAdminService } from '../../../shared/promo-admin.service';
import { Promo } from '../../../../shared-module/models/types/Promo.type';

@Component({
  selector: 'app-promo-display',
  templateUrl: './promo-display.component.html',
  styleUrl: './promo-display.component.scss'
})
export class PromoDisplayComponent implements OnInit{
  private promoAdminService = inject(PromoAdminService);
  
  promoList: Promo[] = [];

  ngOnInit(): void {
    this.promoAdminService.getPromoList$().subscribe(
      promos => this.promoList = promos
    );
  }
  
}
