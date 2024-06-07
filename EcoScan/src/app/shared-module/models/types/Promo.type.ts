export type Promo = {
    promoID: number;
    brandID: number;
    title: string;
    item: string;
    description: string;
    percentOff: number;
    redeemableAmount: number;
    price: number;
    startDate: Date;
    endDate: Date;
}