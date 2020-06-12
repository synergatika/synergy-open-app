import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

// Services & Models
import { OpenDataService } from '../../../core/services/open-data.service';
import { StaticDataService } from 'src/app/core/services/static-data.service';
import { Offer } from '../../../core/models/offer.model';

@Component({
	selector: 'app-offer-list',
	templateUrl: './offer-list.component.html',
	styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
	@Input() partner_id?: string;
	moved: boolean;
	singlePartner: boolean = false;
	customOptions: OwlOptions;

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	public offers: Offer[];

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private router: Router,
		private staticDataService: StaticDataService
	) {
		this.customOptions = staticDataService.getOwlOprions;
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		if (this.partner_id) {
			this.fetchPartnerOffersData(this.partner_id);
			this.singlePartner = true;
		} else {
			this.fetchOffersData();
		}
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	shuffleArray(array: Offer[]) {
		var m = array.length, t, i;

		// While there remain elements to shuffle
		while (m) {
			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}

	fetchOffersData() {
		this.openDataService.readAllOffers(`0-0-0`)
			.pipe(
				tap(
					data => {
						this.offers = this.shuffleArray(data);
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

	fetchPartnerOffersData(partner_id: string) {
		this.openDataService.readOffersByStore(partner_id, `0-0-0`)
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

	mousedown() {
		this.moved = false;
	}

	mousemove() {
		this.moved = true;
	}

	mouseup(partner_id: string, offer_id: string) {
		if (this.moved) {
			console.log('moved')
		} else {
			console.log('not moved');
			console.log(partner_id);
			this.router.navigate([`/offer/${partner_id}/${offer_id}`]);

		}
		this.moved = false;
	}
}
