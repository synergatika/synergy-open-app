import { Partner } from "./partner.model";

export interface PostEvent {
  _id: string;
  imageURL: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  dateTime: number;
  location: string;
  access: string;

  type: string;
  createdAt: string;
  updatedAt: string;

  partner: Partner;
}
// export interface PostEvent {

//   partner_id: string;
//   partner_name: string;
//   subtitle?: string;
//   partner_imageURL: string;
//   partner_slug:string;

//   post_event_id: string;
//   post_event_imageURL?: string;
//   post_imageURL?: string;
//   event_imageURL?: string;
//   title: string;
//   content: string;
//   description?: string;
//   access: string;
//   type: string;

//   location: string;
//   dateTime: string;

//   createdAt: string;
// }