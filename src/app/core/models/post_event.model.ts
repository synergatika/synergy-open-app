export interface PostEvent {

  partner_id: string;
  partner_name: string;
  subtitle?: string;
  partner_imageURL: string;
  partner_slug:string;

  post_event_id: string;
  post_event_imageURL?: string;
  post_imageURL?: string;
  event_imageURL?: string;
  title: string;
  content: string;
  description?: string;
  access: string;
  type: string;

  location: string;
  dateTime: string;

  createdAt: string;
}