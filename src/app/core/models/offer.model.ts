import { PartnerAddress } from './partner_address.model';

export interface Offer {

    partner_id: string;
    partner_name: string;
    partner_imageURL: string;
    partner_slug: string;
    partner_address?: PartnerAddress;

    offer_id: string;
    offer_imageURL: string;
    title: string;
    description: string;
    cost: number;
    expiresAt: number;

    createdAt: string;
}