import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';

import { OpenDataService } from '../../../core/services/open-data.service';
import { Merchant } from '../../../core/models/merchant.model';

//import { LoadJsonService } from '../../../core/services/loadjson.service';
import { Router } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
	selector: 'app-community-list',
	templateUrl: './community-list.component.html',
	styleUrls: ['./community-list.component.scss']
})

export class CommunityListComponent implements OnInit, OnDestroy {
	moved: boolean;
	//objectKeys = Object.keys;
	//list$: Observable<any>;
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
	loading: boolean = false;
	private unsubscribe: Subject<any>;

	merchants: Merchant[];
	/*
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
	]*/

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private router: Router, 
	//	private loadData : LoadJsonService
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.fetchMerchantsData();
		/*this.loadData.getJSON('coops').subscribe(data => {			
			this.list$ = of(data);
        });*/
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
						console.log(this.merchants)
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

	mouseup(id) {
		if (this.moved) {
			console.log('moved')
		} else {
			console.log('not moved');
			this.router.navigate(['/coop/'+id]);

		}
		this.moved = false;
	}

}
