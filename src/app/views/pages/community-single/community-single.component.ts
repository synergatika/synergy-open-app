import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { LoadCommunityService } from '../../../core/services/loadCommunity.service';
import { ActivatedRoute } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OpenDataService } from '../../../core/services/open-data.service';
import { Merchant } from '../../../core/models/merchant.model';
import { Offer } from '../../../core/models/offer.model'
import { PostEvent } from '../../../core/models/post_event.model'
import { MicrocreditCampaign } from '../../../core/models/microcredit-campaign.model';

@Component({
  selector: 'app-community-single',
  templateUrl: './community-single.component.html',
  styleUrls: ['./community-single.component.scss']
})
export class CommunitySingleComponent implements OnInit {
	objectKeys = Object.keys;
	coopId: string;
	private routeSubscription: any;
	loading: boolean = false;
	private unsubscribe: Subject<any>;

	coop: Merchant;
	displayedColumns: string[] = ['description', 'date_from', 'date_to', 'points'];
	dataSource = [];
	gallery = ['gallery-1.jpg','gallery-2.jpg','gallery-1.jpg','gallery-2.jpg','gallery-1.jpg','gallery-2.jpg'];
	customOptions: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: false,
		pullDrag: false,
		dots: false,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
		  0: {
			items: 3
		  },
		  940: {
			items: 4
		  },
		  1600: {
			items: 6
		  }
		},
		margin:10,
		nav: true
	}
	
	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private route: ActivatedRoute, 
		private loadData: LoadCommunityService
	) { 
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		
		this.routeSubscription = this.route.params.subscribe(params => {
			this.coopId = params['id'];
			console.log(this.coopId);
			this.fetchMerchantData(this.coopId);
		});
	}
	
	fetchMerchantData(id) {
		this.openDataService.readMerchantInfo(id)
			.pipe(
				tap(
					data => {
						this.coop = data;
						console.log(this.coop)
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
