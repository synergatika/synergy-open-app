import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

// Services & Models
import { OpenDataService } from '../../../core/services/open-data.service';
import { StaticDataService } from '../../../core/services/static-data.service';
import { Offer } from '../../../core/models/offer.model';

@Component({
	selector: 'app-offer-single',
	templateUrl: './offer-single.component.html',
	styleUrls: ['./offer-single.component.scss']
})
export class OfferSingleComponent implements OnInit, OnDestroy {

	offer_id: string;
	partner_id: string;
	public offer: Offer;

	private routeSubscription: any;

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	constructor(
		private route: ActivatedRoute,
		private cdRef: ChangeDetectorRef,
		private titleService: Title,
		private openDataService: OpenDataService,
		private staticDataService: StaticDataService
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.routeSubscription = this.route.params.subscribe(params => {
			this.partner_id = params['partner_id'];
			this.offer_id = params['offer_id'];
			this.fetchOfferData(this.partner_id, this.offer_id);
		});
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	fetchOfferData(partner_id: string, offer_id: string) {
		this.openDataService.readOffer(partner_id, offer_id)
			.pipe(
				tap(
					data => {
						this.offer = data;
						this.titleService.setTitle(this.offer.title+this.staticDataService.getSiteTitle);
					},
					error => {
						console.log("Can't load offer");
						console.log(error);
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
