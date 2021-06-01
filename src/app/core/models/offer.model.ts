import { Partner } from './partner.model';

export interface Offer {

    _id: string;
    imageURL: string;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    instructions: string;
    cost: number;
    expiresAt: number;
  
    createdAt: Date;
    updatedAt: Date;
  
    partner: Partner;
    // partner_id: string;
    // partner_name: string;
    // partner_imageURL: string;
    // partner_slug: string;
    // partner_address?: PartnerAddress;

    // offer_id: string;
    // offer_imageURL: string;
    // title: string;
    // description: string;
    // cost: number;
    // expiresAt: number;

    // createdAt: string;
}