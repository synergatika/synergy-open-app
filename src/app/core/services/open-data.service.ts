// Core
import { Injectable } from '@angular/core';

// Common
import { HttpClient } from '@angular/common/http';

// Rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Env
import { environment } from '../../../environments/environment';

// Models
import { Merchant } from '../models/merchant.model'
import { Offer } from '../models/offer.model'
import { PostEvent } from '../models/post_event.model'
import { MicrocreditCampaign } from '../models/microcredit-campaign.model';

@Injectable({
  providedIn: 'root'
})
export class OpenDataService {

  constructor(
    private http: HttpClient
  ) { }

  /** 
  * Merchants
  */
  readMerchants(): Observable<Merchant[]> {
    return this.http.get<any>(`${environment.apiUrl}/merchants/public/0-0-0`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readMerchantInfo(merchant_id: string): Observable<Merchant> {
    return this.http.get<any>(`${environment.apiUrl}/merchants/${merchant_id}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  /** 
  * Offers
  */
  readAllOffers(): Observable<Offer[]> {
    return this.http.get<any>(`${environment.apiUrl}/loyalty/offers/public/0-0-0`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readOffersByStore(merchant_id: string): Observable<Offer[]> {
    return this.http.get<any>(`${environment.apiUrl}/loyalty/offers/public/${merchant_id}/0-0-0`)
      .pipe(map(response => {
        return response.data;
      }));
  }
  
  readOffer(merchant_id: string, offer_id: string): Observable<Offer> {
    return this.http.get<any>(`${environment.apiUrl}/loyalty/offers/${merchant_id}/${offer_id}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  /**
   * Post & Events
   */
  readAllPublicPostsEvents(): Observable<PostEvent[]> {
    return this.http.get<any>(`${environment.apiUrl}/community/public/0-0-0`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readPublicPostsEventsByStore(merchant_id: string): Observable<PostEvent[]> {
    return this.http.get<any>(`${environment.apiUrl}/community/public/${merchant_id}`)
      .pipe(map(response => {
        return response.data;
      }));
  }
  
   /** 
   * Microcredit Campaigns
   */
  readAllPublicMicrocreditCampaigns(): Observable<MicrocreditCampaign[]> {
    return this.http.get<any>(`${environment.apiUrl}/microcredit/campaigns/public/0-0-0`)
      .pipe(map(response => {
        return response.data;
      }));
  }
  
  readAllMicrocreditCampaignsByStore(merchant_id: string): Observable<MicrocreditCampaign[]> {
    return this.http.get<any>(`${environment.apiUrl}/microcredit/campaigns/public/${merchant_id}`)
      .pipe(map(response => {
        return response.data;
      }));
  }
}
