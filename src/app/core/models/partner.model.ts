import { PartnerAddress } from './partner_address.model';
import { PartnerContact } from './partner_contact.model';

export interface Partner {
  _id: string;
  email?: string;

  name: string;
  slug: string;
  imageURL: string;
  sector: string;

  address: PartnerAddress;
  contact: PartnerContact;
  timetable: string;
  description?: string;
  createdAt?: Date;
}