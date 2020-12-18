import { PartnerAddress } from './partner_address.model';
import { PartnerPayment } from './partner_payment.model';

export interface MicrocreditCampaign {

    partner_id: string;
    partner_name: string;
    partner_imageURL: string;
    //partner_payment: Payments[];
    partner_payments: PartnerPayment[];
    partner_address: PartnerAddress;

    campaign_id: string,
    campaign_imageURL: string,
    title: string,
    subtitle:string,
    terms: string,
    description: string,
    category: string,
    access: string,

    quantitative: boolean,
    stepAmount: number,
    minAllowed: number,
    maxAllowed: number,
    maxAmount: number,

    redeemStarts: number,
    redeemEnds: number,
    startsAt: number,
    expiresAt: number,

    supports: {
        _id: string,
        backer_id: string,
        initialTokens: number,
        redeemedTokens: number,
        payment_id: string
        status: string
    }[],

    confirmationTokens: {
        _id: string,
        initialTokens: number,
        redeemedTokens: number
    },
    orderedTokens: {
        _id: string,
        initialTokens: number,
        redeemedTokens: number
    },

    createdAt: Date
}