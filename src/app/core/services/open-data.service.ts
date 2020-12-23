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
import { Partner } from '../models/partner.model'
import { Offer } from '../models/offer.model'
import { PostEvent } from '../models/post_event.model'
import { MicrocreditCampaign } from '../models/microcredit-campaign.model';
import { OneClickToken } from '../models/one-click-token.model';
import { PaymentDetails } from '../models/payment-details.model';
import { MicrocreditBalance } from '../models/microcredit-balance.model';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class OpenDataService {

  constructor(private http: HttpClient) { }


  /**
   * Authentication
   */
  oneClickRegistration(email: string): Observable<OneClickToken> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register/one-click`, { email: email })
      .pipe(map(response => {
        return response.data;
      }));
  }


  /** 
  * Partners
  */
  readPartners(offset: string): Observable<Partner[]> {
    return this.http.get<any>(`${environment.apiUrl}/partners/public/${offset}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readPartnerInfo(partner_id: string): Observable<Partner> {
    return this.http.get<any>(`${environment.apiUrl}/partners/${partner_id}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  /** 
  * Offers
  */
  readAllOffers(offset: string): Observable<Offer[]> {
    return this.http.get<any>(`${environment.apiUrl}/loyalty/offers/public/${offset}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readOffersByStore(partner_id: string, offset: string): Observable<Offer[]> {
    return this.http.get<any>(`${environment.apiUrl}/loyalty/offers/public/${partner_id}/${offset}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readOffer(partner_id: string, offer_id: string): Observable<Offer> {
    return this.http.get<any>(`${environment.apiUrl}/loyalty/offers/${partner_id}/${offer_id}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  /**
   * Post & Events
   */
  readAllPublicPostsEvents(offset: string): Observable<PostEvent[]> {
    return this.http.get<any>(`${environment.apiUrl}/community/public/${offset}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readPublicPostsEventsByStore(partner_id: string, offset: string): Observable<PostEvent[]> {
    return this.http.get<any>(`${environment.apiUrl}/community/public/${partner_id}/${offset}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readPublicPostEvent(partner_id: string, post_event_id: string, post_type: string): Observable<PostEvent> {
    // if (post_type == 'post') {
    //   return this.http.get<any>(`${environment.apiUrl}/posts/${partner_id}/${post_event_id}`)
    //     .pipe(map(response => {
    //       return response.data;
    //     }));
    // }
    //    else {
    return this.http.get<any>(`${environment.apiUrl}/${post_type}s/${partner_id}/${post_event_id}`)
      .pipe(map(response => {
        return response.data;
      }));
    //  }
  }


  /** 
  * Microcredit Campaigns
  */

  readAllPublicMicrocreditCampaigns(offset: string): Observable<MicrocreditCampaign[]> {
    return this.http.get<any>(`${environment.apiUrl}/microcredit/campaigns/public/${offset}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readAllMicrocreditCampaignsByStore(partner_id: string, offset: string): Observable<MicrocreditCampaign[]> {
    return this.http.get<any>(`${environment.apiUrl}/microcredit/campaigns/public/${partner_id}/${offset}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readMicrocreditCampaign(partner_id: string, campaign_id: string): Observable<MicrocreditCampaign> {
    return this.http.get<any>(`${environment.apiUrl}/microcredit/campaigns/${partner_id}/${campaign_id}`)
      .pipe(map(response => {
        return response.data;
      }));
  }


  /** 
  * Microcredit Support
  */

  oneClickBalance(partner_id: string, campaign_id: string, token: string): Observable<MicrocreditBalance> {
    return this.http.get<any>(`${environment.apiUrl}/microcredit/one-click-balance/${partner_id}/${campaign_id}/${token}`)
      .pipe(map(response => {
        return response.data;
      }));
  };

  oneClickSupport(partner_id: string, campaign_id: string, token: string, _amount: number, method: string): Observable<PaymentDetails> {
    return this.http.post<any>(`${environment.apiUrl}/microcredit/one-click/${partner_id}/${campaign_id}/${token}`,
      { _amount: _amount, method: method })
      .pipe(map(response => {
        return response.data;
      }));
  };

  /**
   * Communicate
   */
  communicate(sender: string, content: string): Observable<Message> {
    return this.http.post<any>(`${environment.apiUrl}/community/communicate`, { sender: sender, content: content })
      .pipe(map(response => {
        return response;
      }));
  };

}
