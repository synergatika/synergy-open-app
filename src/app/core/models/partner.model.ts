 import { PartnerAddress } from './partner_address.model';
// import { PartnerContact } from './partner_contact.model';

interface Payment {
  bic: string;
  name: string;
  value: string;
}

interface Contact {
  slug: string;
  name: string;
  value: string;
}

export interface Partner {
  _id: string;
  email?: string;

  name: string;
  slug: string;
  imageURL: string;
  sector: string;
phone: string;

  address: PartnerAddress;
  contacts: Contact[];
  payments: Payment[];
  timetable: string;
  description?: string;
  createdAt?: Date;
}