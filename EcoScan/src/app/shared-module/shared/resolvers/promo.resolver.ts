import { ResolveFn } from '@angular/router';
import { Promo } from '../../models/types/Promo.type';
import { inject } from '@angular/core';
import { CardService } from '../services/card.service';
import { Observable } from 'rxjs';

export const promoResolver: ResolveFn<Promo[]> = (route, state) => {
  const promoService = inject(CardService);

  return promoService.getPromos$();
};
