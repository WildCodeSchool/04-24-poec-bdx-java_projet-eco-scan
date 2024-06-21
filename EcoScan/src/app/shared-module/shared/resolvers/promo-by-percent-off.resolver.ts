import { ResolveFn } from '@angular/router';
import { Promo } from '../../models/types/Promo.type';
import { inject } from '@angular/core';
import { CardService } from '../services/card.service';

export const promoByPercentOffResolver: ResolveFn<Promo[]> = (route, state) => {
  const promoByPercent = inject(CardService);
  return promoByPercent.getPromoByPercentOff$();
};
