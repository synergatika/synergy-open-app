import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OpenDataService } from '../../../core/services/open-data.service';
import { Offer } from '../../../core/models/offer.model';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
	selector: 'app-offer-list',
	templateUrl: './offer-list.component.html',
	styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
	@Input() merchId?: string;
	moved: boolean;
	singleMerchant: boolean = false;
	loading: boolean = false;
	private unsubscribe: Subject<any>;
	offers: Offer[];
	customOptions: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: false,
		pullDrag: false,
		dots: true,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
		  0: {
			items: 1
		  },
		  940: {
			items: 3
		  }
		},
		margin:30,
		nav: true
	}

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private router: Router,
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		if(this.merchId){
			this.fetchMerchantOffersData(this.merchId);
			this.singleMerchant = true ;
		} else {
			this.fetchOffersData();
		}
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
	
	fetchMerchantOffersData(id) {
		this.openDataService.readOffersByStore(id)
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

	mouseup(mercId, offerId) {
		if (this.moved) {
			console.log('moved')
		} else {
			console.log('not moved');
			console.log(mercId);
			this.router.navigate(['/offer', {id: mercId , id2: offerId}]);

		}
		this.moved = false;
	}
}
