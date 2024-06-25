import { ResolveFn } from '@angular/router';
import { Promo } from '../../models/types/Promo.type';
import { CardService } from '../services/card.service';
import { inject } from '@angular/core';

export const promoByDateResolver: ResolveFn<Promo[]> = (route, state) => {
  const promoByPercent = inject(CardService);
  return promoByPercent.getPromoByReleaseDate$();
};
