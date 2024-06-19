import { Promo } from './Promo.type';

export type UserPromos = {
  id: number;
  promos: Promo;
  redeemed: boolean;
  purchased: boolean;
};
