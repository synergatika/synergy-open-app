import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OpenDataService } from '../../../core/services/open-data.service';
import { MicrocreditCampaign } from '../../../core/models/microcredit-campaign.model';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
	selector: 'app-microcredit-list',
	templateUrl: './microcredit-list.component.html',
	styleUrls: ['./microcredit-list.component.scss']
})
export class MicrocreditListComponent implements OnInit {
	moved: boolean;
	@Input() merchId?: string;
	singlePartner: boolean = false;
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
		margin: 30,
		nav: true
	}
	loading: boolean = false;
	private unsubscribe: Subject<any>;
	campaigns: MicrocreditCampaign[];
	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private router: Router,
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		if (this.merchId) {
			this.fetchPartnerCampaignsData(this.merchId);
			this.singlePartner = true;
		} else {
			this.fetchCampaignsData();
		}
	}

	fetchCampaignsData() {
		this.openDataService.readAllPublicMicrocreditCampaigns()
			.pipe(
				tap(
					data => {
						this.campaigns = data;
						console.log(this.campaigns)
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

	fetchPartnerCampaignsData(id) {
		this.openDataService.readAllMicrocreditCampaignsByStore(id)
			.pipe(
				tap(
					data => {
						this.campaigns = data;
						console.log(this.campaigns)
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

	mousedown() {
		this.moved = false;
	}

	mousemove() {
		this.moved = true;
	}

	mouseup(mercId, campId) {
		if (this.moved) {
			console.log('moved')
		} else {
			console.log('not moved');
			console.log(mercId);
			this.router.navigate(['/microcredit/' + mercId + '/' + campId]);

		}
		this.moved = false;
	}

}
