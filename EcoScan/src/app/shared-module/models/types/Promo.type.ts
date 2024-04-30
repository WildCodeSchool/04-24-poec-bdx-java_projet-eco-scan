export type Promo = {
    promoID: number;
    brandID: number;
    title: string;
    item: string;
    percentOff: number;
    description: string;
    startDate: Date;
    endDate: Date;
    redeemableAmount: number;
    pointsNeed: number;
}