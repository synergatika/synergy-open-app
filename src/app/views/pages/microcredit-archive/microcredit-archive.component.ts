import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

// Services & Models
import { OpenDataService } from '../../../core/services/open-data.service';
import { MicrocreditCampaign } from '../../../core/models/microcredit-campaign.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-microcredit-archive',
	templateUrl: './microcredit-archive.component.html',
	styleUrls: ['./microcredit-archive.component.scss']
})
export class MicrocreditArchiveComponent implements OnInit {
	p: number = 1;
	public campaigns: MicrocreditCampaign[];

	public _text: string = '';
	public _date: number = 0;

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private router: Router,
		private translate: TranslateService
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

	filterCampaign(campaign: MicrocreditCampaign) {
		const now = new Date();
		const seconds = parseInt(now.getTime().toString());

		if (campaign.startsAt > seconds) {
			this._date = campaign.startsAt;
			return this.translate.instant('CAMPAIGN.STATUS.EXPECTED');
			// this._text = this.translate.instant('CAMPAIGN.STATUS.EXPECTED');
		} else if ((campaign.expiresAt > seconds) && (seconds > campaign.startsAt)) {
			this._date = campaign.expiresAt;
			return this.translate.instant('GENERAL.TO');
			// this._text = this.translate.instant('GENERAL.TO');
		} else if (seconds > campaign.expiresAt) {
			this._date = campaign.redeemEnds;
			return this.translate.instant('CAMPAIGN.STATUS.REDEEM_TO');
			// this._text = this.translate.instant('CAMPAIGN.STATUS.REDEEM_TO');
		}
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

	clickMicrocredit(partner_id: string, campaign_id: string) {
		this.router.navigate([`/microcredit/${partner_id}/${campaign_id}`]);
	}

}
