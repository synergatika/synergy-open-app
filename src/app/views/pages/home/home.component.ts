import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';

import { OpenDataService } from '../../../core/services/open-data.service';
import { Merchant } from '../../../core/models/merchant.model';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit, OnDestroy {
	latitude = 38.262431;
	longitude = 23.686613;
	//markers: marker[];
	markers;
	loading: boolean = false;
	private unsubscribe: Subject<any>;

	merchants: Merchant[];

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.fetchMerchantsData();
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	fetchMerchantsData() {
		this.openDataService.readMerchants()
			.pipe(
				tap(
					data => {
						this.merchants = data;
						//let x: marker[];
						let x;
						this.markers = [{
							lat: parseFloat(this.merchants[0].address.coordinates[0]),
							lng: parseFloat(this.merchants[0].address.coordinates[1]),
							label: '0',
							draggable: true
						}]
						for (var i = 1; i < this.merchants.length; i++) {
							let y = {
								lat: parseFloat(this.merchants[i].address.coordinates[0]),
								lng: parseFloat(this.merchants[i].address.coordinates[1]),
								label: i.toString(),
								draggable: true
							}
							console.log(y);
							this.markers.push(y);
						}
						console.log(x);
						console.log(this.markers);
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
