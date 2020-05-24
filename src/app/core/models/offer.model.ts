interface Address {
    street: string;
    city: string;
    postCode: string;
}

export interface Offer {

    partner_id: string;
    partner_name: string;
    partner_imageURL: string;
    partner_address?: Address;

    offer_id: string;
    offer_imageURL: string;
    title: string;
    description: string;
    cost: number;
    expiresAt: number;

    createdAt: string;
}