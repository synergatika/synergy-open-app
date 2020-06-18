import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { OpenDataService } from '../../../core/services/open-data.service';
import { Offer } from '../../../core/models/offer.model';
@Component({
	selector: 'app-offer-archive',
	templateUrl: './offer-archive.component.html',
	styleUrls: ['./offer-archive.component.scss']
})
export class OfferArchiveComponent implements OnInit {
	p: number = 1;
	loading: boolean = false;
	private unsubscribe: Subject<any>;
	offers: Offer[];
	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
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

}
