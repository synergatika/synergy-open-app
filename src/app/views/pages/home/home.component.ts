import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';

import { OpenDataService } from '../../../core/services/open-data.service';
import { Partner } from '../../../core/models/partner.model';

import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit, OnDestroy {

	public configAccess: Boolean[] = environment.access;
	public configSubAccess: Boolean[] = environment.subAccess;

	latitude = 38.262431;
	longitude = 23.686613;
	//markers: marker[];
	markers;
	loading: boolean = false;
	private unsubscribe: Subject<any>;

	partners: Partner[];

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		//this.fetchPartnersData();
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	fetchPartnersData() {
		this.openDataService.readPartners(`0-0-0`)
			.pipe(
				tap(
					data => {
						this.partners = data;
						//let x: marker[];
						let x;
						this.markers = [{
							lat: (this.partners[0].address) ? parseFloat(this.partners[0].address.coordinates[0]) : 0.0,
							lng: (this.partners[0].address) ? parseFloat(this.partners[0].address.coordinates[1]) : 0.0,
							label: '0',
							draggable: true
						}]
						for (var i = 1; i < this.partners.length; i++) {
							let y = {
								lat: (this.partners[i].address) ? parseFloat(this.partners[i].address.coordinates[0]) : 0.0,
								lng: (this.partners[i].address) ? parseFloat(this.partners[i].address.coordinates[1]) : 0.0,
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
