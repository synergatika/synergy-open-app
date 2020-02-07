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
    return this.http.get<any>(`${environment.apiUrl}/merchants`)
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
    return this.http.get<any>(`${environment.apiUrl}/loyalty/offers/`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readOffersByStore(merchant_id: string): Observable<Offer[]> {
    return this.http.get<any>(`${environment.apiUrl}/loyalty/offers/${merchant_id}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  /**
   * Post & Events
   */
  readAllPublicPostsEvents(): Observable<PostEvent[]> {
    return this.http.get<any>(`${environment.apiUrl}/community/public/`)
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
}
