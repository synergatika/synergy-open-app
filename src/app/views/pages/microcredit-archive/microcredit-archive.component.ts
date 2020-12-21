import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

// Services & Models
import { OpenDataService } from '../../../core/services/open-data.service';
import { MicrocreditCampaign } from '../../../core/models/microcredit-campaign.model';

@Component({
	selector: 'app-microcredit-archive',
	templateUrl: './microcredit-archive.component.html',
	styleUrls: ['./microcredit-archive.component.scss']
})
export class MicrocreditArchiveComponent implements OnInit {
	p: number = 1;
	public campaigns: MicrocreditCampaign[];

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private router: Router,
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.fetchCampaignsData();
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	fetchCampaignsData() {
		this.openDataService.readAllPublicMicrocreditCampaigns(`0-0-1`)
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

	clickMicrocredit(partner_id: string, campaign_id:string){
		this.router.navigate([`/microcredit/${partner_id}/${campaign_id}`]);
	}

}
