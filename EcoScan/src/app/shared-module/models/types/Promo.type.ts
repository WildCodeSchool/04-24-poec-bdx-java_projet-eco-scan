import { Brand } from './Brand.type';

export type Promo = {
  id: number;
  title: string;
  item: string;
  description: string;
  percentOff: number;
  amount: number;
  color: string;
  price: number;
  startDate: Date;
  endDate: string;
  brand: Brand;
};
