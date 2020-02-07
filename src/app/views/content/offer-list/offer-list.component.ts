import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';

import { OpenDataService } from '../../../core/services/open-data.service';
import { Offer } from '../../../core/models/offer.model';

@Component({
	selector: 'app-offer-list',
	templateUrl: './offer-list.component.html',
	styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
	list = [
		{
			name: 'Commonspace',
			img: './assets/media/images/uploaded/commonspace.webp',
			sector: 'Recreation and Culture',
			subscription_date: 'Jan 5, 2020',
			email: 'nfo@commonspace.gr',
			phone: '2103606333',
			address: 'Akakiou 1 - 3 & Ipeirou 60, 10439, Athens'
		},
		{
			name: 'Syn Allois',
			img: './assets/media/images/uploaded/synallois.jpg',
			sector: 'Food',
			subscription_date: 'Jan 1, 2020',
			email: 'info@synallois.org',
			phone: '2103606333',
			address: 'Nileos 35, 11851, Athens'
		},
		{
			name: 'Sociality',
			img: './assets/media/images/uploaded/sociallity.png',
			sector: 'Durables (Technology)',
			subscription_date: 'Jan 15, 2020',
			email: 'contact@sociality.gr',
			phone: '2103606333',
			address: 'Solonos 136, 10677, Athens'
		},
	]

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	offers: Offer[];

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.fetchOffersData();
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	fetchOffersData() {
		this.openDataService.readAllOffers()
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
}
