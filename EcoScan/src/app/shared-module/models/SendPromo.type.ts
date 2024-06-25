export type SendPromo = {
  title: string;
  item: string;
  description: string;
  percentOff: number;
  amount: number;
  color: string;
  price: number;
  startDate: Date;
  endDate: string;
  brand: {
    id: number;
  };
};
