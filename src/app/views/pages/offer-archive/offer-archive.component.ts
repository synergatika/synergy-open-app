import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';

/**
 * Models & Interfaces
 */
import { Offer } from '../../../core/models/offer.model';

/**
 * Services
 */
import { OpenDataService } from '../../../core/services/open-data.service';

@Component({
	selector: 'app-offer-archive',
	templateUrl: './offer-archive.component.html',
	styleUrls: ['./offer-archive.component.scss']
})
export class OfferArchiveComponent implements OnInit, OnDestroy {

	public offers: Offer[];

	p: number = 1;

	private unsubscribe: Subject<any>;
	loading: boolean = false;

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private router: Router,
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.fetchOffersData();
	}

	fetchOffersData() {
		this.openDataService.readAllOffers(`0-0-1`)
			.pipe(
				tap(
					data => {
						this.offers = data;
						console.log(this.offers)
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

	clickOffer(partner_id: string, offer_id: string) {
		this.router.navigate([`/offer/${partner_id}/${offer_id}`]);
	}
}
