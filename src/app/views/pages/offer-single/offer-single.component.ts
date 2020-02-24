import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OpenDataService } from '../../../core/services/open-data.service';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../../../core/models/offer.model';
// RxJS
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-offer-single',
  templateUrl: './offer-single.component.html',
  styleUrls: ['./offer-single.component.scss']
})
export class OfferSingleComponent implements OnInit {
	offerId: string;
	merchId: string;
	//offer$: Observable<any>;
	//coop$: Observable<any>;
	loading: boolean = false;
	private unsubscribe: Subject<any>;
	offer: Offer;
	private routeSubscription: any;
	
	constructor(
		private route: ActivatedRoute,
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.routeSubscription = this.route.params.subscribe(params => {
			this.offerId = params['id'];
			console.log(this.offerId);
			this.merchId = params['id2'];
			console.log(this.merchId);
			this.fetchOfferData(this.merchId,this.offerId);
			/*this.loadData.getJSON('offers').subscribe(data => {			
				this.offer$ = of(data[this.offerId]);
				this.coopId = data[this.offerId]['coop_id'];
				this.loadData.getJSON('coops').subscribe(coops => {			
					this.coop$ = of(coops[this.coopId]);

				});
			});*/
		});
	}
	
	fetchOfferData(merch_id, offer_id) {
		this.openDataService.readOffer(offer_id, merch_id)
			.pipe(
				tap(
					data => {
						this.offer = data;
						console.log(this.offer)
					},
					error => {
					}),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdRef.markForCheck();
				})
			)
			.subscribe();
	}
	
	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

}
