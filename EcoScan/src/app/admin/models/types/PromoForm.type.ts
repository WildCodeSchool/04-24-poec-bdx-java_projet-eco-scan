export type PromoForm = {
    title: string;
    item: string;
    description: string;

    percentOff: number;
    redeemableAmount: number;
    pointsNeed: number;
    
    startDate: Date;
    endDate: Date;
}